import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Event } from "../types";
import { useEffect, useState } from "react";
import axios from "axios";

interface EventTableProps {
  onEdit: (event: Event) => void;
  handleDelete: (id: string) => void;
  filteredEvents: Event[];
}

const EventGrid: React.FC<EventTableProps> = ({ onEdit,handleDelete ,filteredEvents}) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        if (response.data.success) {
          setEvents(response.data.data);
        } else {
          console.error("Error fetching events:", response.data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchEvents();
  }, []);


  
  return (
    <DataTable value={filteredEvents ? filteredEvents : events} stripedRows paginator rows={15}>
      <Column field="name" header="Event Name" />
      <Column field="location" header="Location" />
      <Column field="address" header="Address" />
      <Column field="organizer" header="Organizer" />
      <Column field="date" header="Date" />
      <Column field="time" header="Time" />
      <Column field="type" header="Type" />
      {/* <Column field="id" header="id" /> */}
      <Column
        header="Actions"
        body={(rowData) => (
          <div className="flex gap-2">
            <Button icon="pi pi-pencil" onClick={() =>{ onEdit(rowData)}} />
            <Button icon="pi pi-trash" className="p-button-danger" onClick={() => handleDelete(rowData?._id)} />
          </div>
        )}
      />
    </DataTable>
  );
};

export { EventGrid };
