"use client";
import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Event, EventType } from "./types";
import { CreateEvent, EventGrid } from "./components";

const cities = [
    { name: "Lahore", code: "LHR" },
    { name: "Multan", code: "MLN" },
    { name: "Karachi", code: "KHI" },
    { name: "Islamabad", code: "ISB" },
    { name: "Faisalabad", code: "FSD" },
    { name: "Rawalpindi", code: "RWP" },
    { name: "Peshawar", code: "PSH" },
    { name: "Quetta", code: "QTA" },
];

const TechEventsContainer: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<{ name: string; code: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [events, setEvents] = useState<Event[]>([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [editEvent, setEditEvent] = useState<Event | null>(null);

    const fetchEvents = async () => {
        try {
            const response = await axios.get("/api/events");
            if (response.data.success) {
                setEvents(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);



    const handleSave = async (data: Event) => {
        try {
            let response;
            if (data?.id) {
                // console.log("Updating event with ID:", data.id);
                response = await axios.put(`/api/events/${data?.id}`, data);
            } else if (data?.name) {
                data.id = Date.now().toString();
                response = await axios.post("/api/events", data);
            }

            if (response?.data?.success) {
                fetchEvents();
                handleDialogClose();
            }
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            console.log("Deleting event with ID:", id);

            const response = await axios.delete(`/api/events/${id}`);
            //   console.log("Delete response:", response.data);
            if (response.data.success) {
                fetchEvents();
                console.log(" Event deleted successfully!");
            } else {
                console.error(" Delete failed:", response.data.message);
            }
        } catch (error) {
            console.error(" Error deleting event:", error);
        }
    };

    const filteredEvents = events?.filter(
        (event) =>
            (!selectedCity || event?.location === selectedCity?.name) &&
            event?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onEdit = async (data: Event) => {
        try {
            setEditEvent(data);
            setDialogVisible(true)
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };
    const handleDialogClose = () => {
        setDialogVisible(false);
        setEditEvent(null);
    };
    const handleClearCity = () => {
        setSelectedCity(null);
    };

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-3 mb-4 justify-content-between align-items-center">
                <div className="flex gap-2">
                    <Dropdown
                        value={selectedCity}
                        options={cities}
                        onChange={(e) => setSelectedCity(e.value)}
                        optionLabel="name"
                        placeholder="Select City"
                        className="w-15rem"
                    />
                    <Button label="Clear" icon="pi pi-times" severity="secondary" onClick={handleClearCity} />
                </div>
                <InputText value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search event..." className="w-20rem" />
                <Button label="Add Event" icon="pi pi-plus" onClick={() => setDialogVisible(true)} />
            </div>
            <EventGrid onEdit={onEdit} handleDelete={handleDelete} events={filteredEvents ?? events} />
            {/*  onDelete={handleDelete} */}
            <CreateEvent visible={dialogVisible} onHide={handleDialogClose} onSubmit={handleSave} defaultValues={editEvent || null} />
        </div>
    );
};

export { TechEventsContainer };