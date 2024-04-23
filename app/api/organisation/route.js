import { NextResponse } from "next/server";
import Organisation from "@/models/Organisation";
import connectMongo from "@/utils/generic/mongoose";

// This function is specific for creating a new organisation (on sign up). 
export async function POST(payload) { 
    await connectMongo();

    const body = await payload.json();

    //This checks to make sure that every required parameter has been provided in the payload.
    if (!body.name || !body.overview) {
    return NextResponse.json({ error: "Missing parameter" }, { status: 400 });
    }

    try {
        //Create the new organisation in the database
        const organisation = await Organisation.create(
            { 
                name: body.name,
                overview: body.overview,
            });

        //get the id from the organisation that was just created
        const id = organisation['_id'].valueOf()

        //return the id to the front end so it can be used to create the share link.
        return NextResponse.json({id}, {status: 200});

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

// this is the function for updating the overview of an organisation
export async function PUT(payload) { 
    await connectMongo();

    const body = await payload.json();

    //This checks to make sure that every required parameter has been provided in the payload.
    if (!body.id || !body.overview ) {
    return NextResponse.json({ error: "Missing parameter" }, { status: 400 });
    }

    try {
        //Update the overview in the organisation by the id
        await Organisation.updateOne(
            { _id: body.id },
            { $set: {overview: body.overview}},
            {
                upsert: false,
            }
            );

        return NextResponse.json({}, {status: 200});

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

// This is the fucntion for retrieving the organisation information. 
export async function GET(request) {
    await connectMongo();
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    try {
        const organisation = await Organisation.findOne({ _id: id })
        return NextResponse.json(organisation, {status: 200})
    } catch (e) {
        return NextResponse.json({ error: e.message}, {status: 500})
    }
}