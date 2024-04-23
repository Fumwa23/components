import { NextResponse } from "next/server";
import Deal from "@/models/Deal";
import connectMongo from "@/utils/generic/mongoose";

//This is the get request for getting a SINGLE deal
export async function GET(request) {
    await connectMongo();
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    try {
        const deals = await Deal.find({researchId: id })// this will probably need to be a find many

        return NextResponse.json(deals, {status: 200})
    } catch (e) {
        return NextResponse.json({ error: e.message}, {status: 500})
    }
}