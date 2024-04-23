import { NextResponse } from "next/server";
import Deal from "@/models/Deal";
import connectMongo from "@/utils/generic/mongoose";
import Research from "@/models/Research";

//             "name": "ANYbotics", 
//             "data": {
//                 "tagline": "We can make ANY robot and it will be amazing.",
//                 "companySummary": "ANYbotics, a Swiss startup founded in 2016 and a spinout from ETH Zurich, develops four-legged autonomous robots for industrial use. These robots, including their first product ANYmal, are used for inspection in hazardous environments in sectors like oil and gas, mining, and chemicals. Their innovative approach includes thermographic imaging and gas detection sensors. The company has recently raised $50m in Series B funding to fulfill product preorders and expand to new markets, with plans to grow their team significantly.",
//                 "age": "8",
//                 "headcount": "10",
//                 "estimatedRevenue": "unknown",
//                 "estimatedInvestment": "$50m",
//                 "updatesSinceLastChecked": "1",
//                 "funding": [
//                     {
//                         "amount": "4 million",
//                         "timestamp": "8/12/2023",
//                         "source": "Y Combinator"
//                     },
//                     {
//                         "amount": "1 million",
//                         "timestamp": "8/6/2022",
//                         "source": "Y Combinator"
//                     },
//                 ],
//                 "team": [
//                      {
//                          "name": "Péter Fankhauser",
//                          "title": "CEO and Co-Founder",
//                          "age": "35",
//                          "email": "unknown",
//                          "phoneNumber": "unknown"
//                      }
//                  ],
//                  "keyEvents": [
//                      {
//                         "event":"raised $50m in Series B funding",
//                         "timestamp": "2023"
//                      },
//                  ],
//             },
//             "portfolioScore": "4",
//             "portfolioScoreReason": "ANYbotics, specializing in autonomous robots for industrial inspection, diverges from our core investment thesis centered on healthcare, biohacking, supplements, and longevity. Despite its technological innovation and growth potential, its focus on industrial applications limits its relevance to our investment criteria.",
//             "researchId": researchId,
//             "flagged": "a"

//POST FUNCTION HAS NOT BEEN MADE
export async function POST(payload) { 
    await connectMongo();

    const body = await payload.json();

    //This checks to make sure that every required parameter has been provided in the payload.
    if (!body.name || !body.data || !body.portfolioScore || !body.portfolioScoreReason || !body.researchId || !body.flagged) {
    return NextResponse.json({ error: "Missing parameter" }, { status: 400 });
    }

    try {
        //Create the new deal in the database
        const deal = await Deal.create(
            { 
                name: body.name,
                data: body.data,
                portfolioScore: body.portfolioScore,
                portfolioScoreReason: body.portfolioScoreReason, // CHECK: the new implementation means we nolonger have the dictionary inside the data base, which means updates to the input will require updates to this, as well as the schema.
                researchId: body.researchId,
                flagged: body.flagged
            });

        //get the id from the deal that was just created
        const id = deal['_id'].valueOf()

        //return the id to the front end so it can be used to update status
        return NextResponse.json({id}, {status: 200});

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

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


//This is the get request for getting a SINGLE deal
export async function GET(request) {
    await connectMongo();
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    try {
        const deal = await Deal.findOne({ _id: id })

        return NextResponse.json(deal, {status: 200})
    } catch (e) {
        return NextResponse.json({ error: e.message}, {status: 500})
    }
}