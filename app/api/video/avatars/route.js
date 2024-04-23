import { listAvatars, listVoices } from "@/utils/generic/ai/heygen";
import { NextResponse } from "next/server";

export async function POST(req) {
	console.log('getting website')
	// await connectMongo();
	
	// const body = await req.json();

    const response = await listAvatars()
    console.log(response)
    for (const avatar of response.data.avatars) {
        console.log(avatar)
    }
    for (const voice of response.data.talking_photos) {
        console.log(voice)
    }

    const voiceResponse = await listVoices()
    for (const voice of voiceResponse.data.voices) {
        console.log(voice)
    }
    // console.log(response.data.)
    return NextResponse.json(response, {status: 200})
}