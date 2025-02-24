import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Event } from "../types";
import { useEffect, useState } from "react";


interface EventTableProps {
  onEdit: (event: Event) => void;
  handleDelete: (id: string) => void;
 events: Event[]
}

const EventGrid: React.FC<EventTableProps> = ({ onEdit,handleDelete, events,}) => {
//   const [events, setEvents] = useState<Event[]>([]);
  
  return (
    <DataTable value={ events} stripedRows paginator rows={15}>
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
            <Button icon="pi pi-trash" className="p-button-danger" onClick={() => handleDelete(rowData?.id)} />
          </div>
        )}
      />
    </DataTable>
  );
};

export { EventGrid };
