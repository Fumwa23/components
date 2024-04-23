import { NextResponse } from "next/server";
import Research from "@/models/Research";
import connectMongo from "@/utils/generic/mongoose";

//When the get request is being done, we are fetching MANY researches.
export async function GET(request) {
    await connectMongo();
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    try {
        const researches = await Research.find({ organisationId: id })// this will probably need to be a find many

        return NextResponse.json(researches, {status: 200})
    } catch (e) {
        return NextResponse.json({ error: e.message}, {status: 500})
    }
}