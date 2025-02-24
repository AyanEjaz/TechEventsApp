import { NextResponse } from "next/server";
import { readEventsFromCSV } from ".././../../../lib/utils/csvutils";

export async function GET() {
  const events = readEventsFromCSV();
  return NextResponse.json(events);
}
