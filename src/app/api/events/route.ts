import { NextResponse } from "next/server";
import {clientPromise} from "../../../lib/mongodb";
import { ObjectId } from "mongodb"; // Import for handling MongoDB ObjectId

// ✅ GET: Fetch All Events
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tech-events");
    const events = await db.collection("events").find().toArray();

    console.log("✅ Events fetched successfully!");
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return NextResponse.json({ success: false, message: "Error fetching events", error });
  }
}

// ✅ POST: Create a New Event
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("tech-events");
    const body = await req.json();

    await db.collection("events").insertOne(body);

    return NextResponse.json({ success: true, message: "Event added!" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error adding event", error });
  }
}

