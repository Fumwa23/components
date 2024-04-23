import { headers } from "next/headers"
import Video from "@/models/Video";
import { use } from "react"
import connectMongo from "@/utils/generic/mongoose";
import { redirect } from "next/navigation";
import Link from "next/link";

const getVideoById = async (videoId) => {
    await connectMongo();
    return await Video.findById(videoId)
}

const Watch = () => {

    const path = headers().get("pathname")
    const videoId = path.split("/").pop()
    const video = use(getVideoById(videoId))

    // TODO track video views and update video "visits" in DB
    
    const src="https://videofunnels-videos-prod.s3.eu-west-2.amazonaws.com/webinars/videoFunnelsDemo.mp4"

    return (
        <div className="flex flex-col items-center w-full h-full justify-center">

            <video src={src} className="rounded w-[80%] m-2" controls></video>
            {/* <button>Try now</button> */}
            <Link href={video.ctaUrl}>
                {/* TODO track conversions based on clicks and update "conversions" in DB (may require client-side rendering)*/}
                <button className="btn btn-gradient animate-shimmer">
                    Take the next step!
                    {/* {video.} */}
                </button>
            </Link>
        </div>
    )
}

export default Watch