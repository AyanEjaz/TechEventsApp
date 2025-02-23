import { NextResponse } from "next/server";
import { readEventsFromCSV } from "../../../../lib/csv";

export async function GET() {
  const events = readEventsFromCSV();
  return NextResponse.json(events);
}
