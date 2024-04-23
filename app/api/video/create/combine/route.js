import { NextResponse } from "next/server";
import { retrieveDIDVideoURLById } from "@/utils/generic/ai/d-id";
// import { generateVideoFromScript, retrieveVideoById } from "@/utils/generic/ai/heygen";
import download from "@/utils/generic/download";
import { combineVideos } from "@/utils/generic/video";
import { uploadToS3 } from "@/utils/generic/aws";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import connectMongo from "@/utils/generic/mongoose";
import { authOptions } from "@/utils/generic/next-auth";


export async function POST(req) {

	// JUST FOR TESTING AND RETURNING ID WITHOUT WAITING
	// const videoId = "65b327a4ee44dadeb0c6fb4e"
	// return NextResponse.json(videoId, { status: 200 });	
	
	const body = await req.json();
	const videoIds = body.videoIds
	console.log('video ids in combine', videoIds)

	// SAVE VIDEO TO DB AND GET ID
	await connectMongo();

	const session = await getServerSession(authOptions)
	const userId = session.user.id

	let videoRecord = {
		userId,
		ctaUrl: body.ctaUrl,
		title: body.title,
	}
	console.log(videoRecord)
	const video = await Video.create(videoRecord)
	const videoId = video._id.toString()

	// GET VIDEO URLS FROM GEN VIDEO PROVIDER
	let videoURLs = []
	for (const videoId of videoIds) {

		// D-ID
		const videoURL = await retrieveDIDVideoURLById(videoId)
		// HEYGEN
		// const video = retrieveVideoById(videoId)
		videoURLs.push(videoURL)
	}
	videoURLs = await Promise.all(videoURLs)
	// const videoUrls = videos.map(v => {
	// 	return v.data.video_url
	// })
	console.log('video urls', videoURLs)

	// DOWNLOAD VIDEOS
	console.log('downloading videos')
	const downloads = []
	for (const [idx, videoUrl] of videoURLs.entries()) {
		console.log('video url:', videoUrl)
		const dl = download(videoUrl, `tmp/vid-${idx}.mp4`)
		downloads.push(dl)
	}
	const fps = await Promise.all(downloads)

	// COMBINE VIDEOS
	console.log('combining videos')
	const videoPath= `tmp/${videoId}.mp4`
	await combineVideos(fps, videoPath)

	// TODO find length of generated video and set in "duration" key of videoRecord (already in Video model) (in seconds)

	// UPLOAD VIDEO TO S3
	console.log('uploading video to s3')
	const s3Path = `webinars/${videoId}.mp4`
	const publicUrl = await uploadToS3(videoPath, s3Path, 'videofunnels-videos-prod')

	// UPDATE VIDEO IN DB
	console.log('updating video in db')
	videoRecord = {
		...videoRecord,
		publicUrl,
	}
	console.log(videoRecord)
	await Video.findByIdAndUpdate(videoId, videoRecord)

	return NextResponse.json(videoId, { status: 200 });
}