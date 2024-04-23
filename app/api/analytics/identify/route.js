import { NextResponse } from "next/server";
import { identify } from "@/utils/generic/analytics";

export async function POST(req) {

    const body = await req.json();
    console.log(body)

    // const auth_properties = {"family_name": "$first_name", "given_name": "$last_name"}
    // for (const prop in auth_properties) {
    //     if (prop in body) {
    //         body[auth_properties[prop]] = body[prop]
    //         delete body[prop]
    //     }
    // }

    try {
        identify(body)
        return NextResponse.json({ status: 200});
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ status: 500});
    }
}

    // mp_special_properties = ["email", "phone"]
    // for prop in mp_special_properties:
    //     if prop in properties:
    //         properties["$"+prop] = properties[prop]
    //         del properties[prop]

    // mp.people_set(user_id, properties)