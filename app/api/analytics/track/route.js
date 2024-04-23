import { track } from '@/utils/generic/analytics';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { event, properties} = await req.json();
    try {
        track(event, properties)
        return NextResponse.json({ status: 200});
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ status: 500});
    }
}