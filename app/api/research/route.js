import { NextResponse } from "next/server";
import Research from "@/models/Research";
import connectMongo from "@/utils/generic/mongoose";

export async function POST(payload) { 
    await connectMongo();

    const body = await payload.json();

    //This checks to make sure that every required parameter has been provided in the payload.
    if (!body.title || !body.recurrence || !body.status || !body.config || !body.organisationId || !body.userId) {
    return NextResponse.json({ error: "Missing parameter" }, { status: 400 });
    }

    try {
        //Create the new research in the database
        const research = await Research.create(
            { 
                title: body.title,
                recurrence: body.recurrence,
                status: body.status,
                config: body.config, // CHECK: the new implementation means we nolonger have the dictionary inside the data base, which means updates to the input will require updates to this, as well as the schema.
                organisationId: body.organisationId,
                userId: body.userId
            });

        //get the id from the research that was just created
        const id = research['_id'].valueOf()

        //return the id to the front end so it can be used to update status
        return NextResponse.json({id}, {status: 200});

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

//function used to update Status. Significant changes necessary to allow it to update any given value. 
export async function PUT(payload) { 
    await connectMongo();

    const body = await payload.json();

    //This checks to make sure that every required parameter has been provided in the payload.
    if (!body.id || !body.status ) {
    return NextResponse.json({ error: "Missing parameter" }, { status: 400 });
    }

    try {
        //Update the research in the database
        await Research.updateOne(
            { _id: body.id },
            { $set: {status: body.status}},
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


//Fetching ONE research.
export async function GET(request) {
    console.log("running 87")
    await connectMongo();
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    console.log(id)
    try {
        const researches = await Research.findOne({ _id: id })// this will probably need to be a find many
        console.log(researches)

        return NextResponse.json(researches, {status: 200})
    } catch (e) {
        return NextResponse.json({ error: e.message}, {status: 500})
    }
}