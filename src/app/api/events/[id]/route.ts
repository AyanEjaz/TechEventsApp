import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import EventModel from "../../../../models/events";
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
  
      console.log("Updating Event ID:", id);

      const updatedEvent = await req.json();
     console.log("Updated Event Data:", updatedEvent);
      delete updatedEvent._id;
  
      const client = await clientPromise;
      const db = client.db("tech-events");
      const result = await db.collection("events").updateOne(
        { id: id },
        { $set: updatedEvent }
      );
  
      if (result.modifiedCount === 0) {
        return NextResponse.json({ success: false, message: "Event not found or not updated" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, message: "Event updated successfully" }, { status: 200 });
    } catch (error) {
      console.error(" Error updating event:", error);
      return NextResponse.json(
        { success: false, message: "Error updating event", error: error },
        { status: 500 }
      );
    }
  }


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      if (!id ) {
        return NextResponse.json({ success: false, message: "Invalid Event ID" }, { status: 400 });
      }
  
      const client = await clientPromise;
      const db = client.db("tech-events");
  
      const result = await db.collection("events").deleteOne({ id: id });
  
      if (result.deletedCount === 0) {

        return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
      }
  
    //   console.log(" Event deleted successfully:", id);
      return NextResponse.json({ success: true, message: "Event deleted!" });
    } catch (error) {
      console.error(" Error deleting event:", error);
      return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
  }
  
  
  
