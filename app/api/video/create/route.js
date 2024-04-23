import { NextResponse } from "next/server";
import { createTalk, retrieveDIDVideoURLById } from "@/utils/generic/ai/d-id";
import { uploadToS3 } from "@/utils/generic/aws";
// import { generateVideoFromScript } from "@/utils/generic/ai/heygen";

export async function POST(req) {
	console.log('creating video')
	// await connectMongo();

	// TODO put in "clips" collection of DB with status "generating"
	
	const body = await req.json();

	const s3key = "avatar-images/test.jpg"
	await uploadToS3("data/Profile.jpg", s3key, "videofunnels-videos-prod")
	const s3URL = `https://videofunnels-videos-prod.s3.eu-west-2.amazonaws.com/${s3key}`

	// SEPARATE IMPLEMENTATION
	const videoPromises = []
	for (const section of body.script) {
		// TODO generate realistic voiceover using openai
		// TODO use D-ID instead of heygen
		const script = section.response
		// const script = "Ladies and gentlemen, welcome to fight club"
		const img_path = s3URL
		const response = createTalk({script, img_path})
		// // // HEYGEN
		// // // const response = generateVideoFromScript(section.response) // generate video for each section of the script
		videoPromises.push(response)
	}
	const videoIds = await Promise.all(videoPromises) // await all
	// console.log('video ids', videoIds)
	// console.log('retrieving video ')
	// const video = await retrieveDIDVideoURLById()
	// console.log('retrieved video')
	// console.log(video)
	// TODO generate slides
	// TODO vary layout throughout video (picture in picture, webcam view, screen capture only etc.)
	// TODO animated transitions between scenes
	// TODO add music
	// TODO add b-roll
	// TODO save to S3

	// TODO implement webhook to update status of clips in DB to "ready"
	
	console.log('video ids:', videoIds)
	return NextResponse.json(videoIds, { status: 200 });

	

	
	
	// ALL AT ONCE IMPLEMENTATION
	// const scriptText = body.script.map(s => {
	// 	return s.response}).join('\n')
	// // const response = await createClip({script: scriptText})
	// const response= await generateVideoFromScript(scriptText)
	// console.log(response)
	// const id = response.data.id
	// return NextResponse.json(id, { status: 200 });
}