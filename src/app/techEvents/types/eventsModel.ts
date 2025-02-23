export enum EventType {
    Conference = "Conference",
    Meeting = "Meeting",
    Dining = "Dining",
    Studying = "Studying",
    Working = "Working",
    Other = "Other",
  }
  
  export interface Event {
    id: string;
    name: string;
    location: string;
    address: string;
    organizer: string;
    date: string;
    time: string;
    type: EventType;
    _id:string;
  }
  