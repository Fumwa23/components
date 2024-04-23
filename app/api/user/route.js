import { NextResponse } from "next/server";
import connectMongo from "@/utils/generic/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth";

// This route is used to store the users that are generated from the landing page.
// The API call is initiated by <Buttonuser /> component
// Duplicate emails just return 200 OK
export async function GET() {
  await connectMongo();

  try {
    const session = await getServerSession()
    const user = await User.findOne({ email: session.user.email });
    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
