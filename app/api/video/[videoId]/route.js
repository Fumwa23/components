import { NextResponse } from "next/server";
import { retrieveDIDVideoURLById } from "@/utils/generic/ai/d-id";

export const GET = async (req) => {

	const id = new URL(req.url).pathname.split('/').pop()
	console.log(id)

	const videoURL = await retrieveDIDVideoURLById(id)
	console.log(videoURL)
	return NextResponse.json(videoURL)
}
