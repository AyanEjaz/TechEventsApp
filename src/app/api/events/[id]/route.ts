import { NextRequest, NextResponse } from "next/server";
import { clientPromise } from "../../../../lib/mongodb";


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
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
  
// import { NextRequest, NextResponse } from "next/server";
// import { readEventsFromCSV, writeEventsToCSV } from "../../../../lib/utils/csvutils"; // Import CSV functions

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   const events = readEventsFromCSV();
//   const event = events.find((event) => event.id === params.id);

//   if (!event) {
//     return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
//   }

//   return NextResponse.json({ success: true, data: event });
// }

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const events = readEventsFromCSV();
//     const eventIndex = events.findIndex((event) => event.id === params.id);

//     if (eventIndex === -1) {
//       return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
//     }

//     const updatedEvent = await req.json();
//     events[eventIndex] = { ...events[eventIndex], ...updatedEvent };
//     writeEventsToCSV(events);

//     return NextResponse.json({ success: true, message: "Event updated successfully" });
//   } catch (error) {
//     console.error("Error updating event:", error);
//     return NextResponse.json({ success: false, message: "Error updating event" }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     let events = readEventsFromCSV();
//     const initialLength = events.length;
//     events = events.filter((event) => event.id !== params.id);

//     if (events.length === initialLength) {
//       return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
//     }

//     writeEventsToCSV(events);
//     return NextResponse.json({ success: true, message: "Event deleted!" });
//   } catch (error) {
//     console.error("Error deleting event:", error);
//     return NextResponse.json({ success: false, message: "Error deleting event" }, { status: 500 });
//   }
// }

  
