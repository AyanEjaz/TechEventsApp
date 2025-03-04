import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import { IEvent, EventType } from "../../models/events";

const filePath = path.join(process.cwd(), "src/data/events.csv");

// Read events from CSV
export const readEventsFromCSV = (): IEvent[] => {
  if (!fs.existsSync(filePath)) return [];

  const data = fs.readFileSync(filePath, "utf-8");
  return parse(data, {
    columns: true,
    skip_empty_lines: true,
  }) as IEvent[];
};

// Write events to CSV
export const writeEventsToCSV = (events: IEvent[]) => {
  const csvData = stringify(events, {
    header: true,
    columns: [
      "eventName",
      "location",
      "address",
      "organizerName",
      "eventDate",
      "eventTime",
      "eventType",
    ],
  });

  fs.writeFileSync(filePath, csvData);
};
