import mongoose, { Schema, Document } from "mongoose";

export enum EventType {
  Conference = "Conference",
  Meeting = "Meeting",
  Dining = "Dining",
  Studying = "Studying",
  Working = "Working",
  Other = "Other",
}

export interface IEvent extends Document {
  name: string;
  location: string;
  address: string;
  organizer: string;
  date: string;
  time: string;
  type: EventType;
}

const EventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  organizer: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  type: { type: String, enum: Object.values(EventType), required: true },
});

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
