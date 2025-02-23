import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import EventModel from "../../../../models/events";
import { ObjectId } from "mongodb";
import { clientPromise } from "../../../../lib/mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const event = await EventModel.findById(params.id);
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
  return NextResponse.json(event);
}



export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      await connectToDatabase();
      const { id } = params;
  
      if (!id || !ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, message: "Invalid event ID" }, { status: 400 });
      }
  
      console.log("🆔 Updating Event ID:", id);
  
      // Read request body
      const updatedEvent = await req.json();
  
      // Remove `_id` field to avoid modification error
      delete updatedEvent._id;
  
      const client = await clientPromise;
      const db = client.db("tech-events");
      const result = await db.collection("events").updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedEvent }
      );
  
      console.log("MongoDB Update Result:", result);
  
      if (result.modifiedCount === 0) {
        return NextResponse.json({ success: false, message: "Event not found or not updated" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, message: "Event updated successfully" }, { status: 200 });
    } catch (error) {
      console.error("❌ Error updating event:", error);
      return NextResponse.json(
        { success: false, message: "Error updating event", error: error },
        { status: 500 }
      );
    }
  }


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
    //   console.log(" Received DELETE request for ID:", id);
  
      if (!id || id.length !== 24) {
        // console.error(" Invalid ID received in API:", id);
        return NextResponse.json({ success: false, message: "Invalid Event ID" }, { status: 400 });
      }
  
      const client = await clientPromise;
      const db = client.db("tech-events");
  
      const result = await db.collection("events").deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        // console.error(" Event not found:", id);
        return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
      }
  
    //   console.log(" Event deleted successfully:", id);
      return NextResponse.json({ success: true, message: "Event deleted!" });
    } catch (error) {
      console.error(" Error deleting event:", error);
      return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
  }
  
  
  
