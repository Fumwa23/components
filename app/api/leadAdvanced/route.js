import { NextResponse } from "next/server";
import connectMongo from "@/utils/generic/mongoose";
import LeadAdvanced from "@/models/LeadAdvanced";

// This route is used to store the leads that are generated from the landing page.
// The API call is initiated by <ButtonLead /> component
// Duplicate emails just return 200 OK
export async function POST(req) {
  await connectMongo();

  const body = await req.json();

  if (!body.email || !body.name) {
    return NextResponse.json({ error: "Email and Name are required" }, { status: 400 });
  }

  try {
    const lead = await LeadAdvanced.findOne({ email: body.email });

    if (!lead) {
      await LeadAdvanced.create({ email: body.email, name: body.name});

      // Here you can add your own logic
      // For instance, sending a welcome email (use the the sendEmail helper function from /libs/mailgun)
    }

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}