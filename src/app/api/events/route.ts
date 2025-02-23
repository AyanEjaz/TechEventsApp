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


export async function DELETE(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("tech-events");

    const { id } = await req.json(); // Get event ID from request body
    console.log("🗑 Received DELETE request for ID,,,,:", id);
    if (!id) {
      return NextResponse.json({ success: false, message: "Event ID is required" });
    }

    const result = await db.collection("events").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Event not found" });
    }

    return NextResponse.json({ success: true, message: "Event deleted!" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting event", error });
  }
}

// ✅ PUT: Update an Event
export async function PUT(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("tech-events");

    const { id, ...updatedEvent } = await req.json(); // Extract event ID and updated data

    if (!id) {
      return NextResponse.json({ success: false, message: "Event ID is required" });
    }

    const result = await db.collection("events").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedEvent }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Event not found" });
    }

    return NextResponse.json({ success: true, message: "Event updated!" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating event", error });
  }
}
