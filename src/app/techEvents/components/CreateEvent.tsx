import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Event, EventType } from "../types";
import { useEffect } from "react";

interface EventDialogProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: Event) => void;
  defaultValues: Event | null;
}

const CreateEvent: React.FC<EventDialogProps> = ({ visible, onHide, onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Event>({
    defaultValues: {
  } as Event});

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        type: defaultValues.type || EventType.Conference, // Ensure type has a valid default
      });
    } else {
      reset({
        name: "",
        location: "",
        address: "",
        organizer: "",
        date: "",
        time: "",
        type: EventType.Conference, 
      });
    }
  }, [defaultValues, reset]);
  
  

  const submitHandler = (data: Event) => {

    onSubmit(data);
    
    onHide();
  };
;


  return (
    <Dialog header={defaultValues?.id ? "Edit Event" : "Add Event"} visible={visible} onHide={onHide}>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-column gap-3">
        <div className="grid">
          <div className="col-6">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Event Name is required" }}
              render={({ field }) => (
                <>
                  <InputText {...field} placeholder="Event Name" className="w-full" />
                  {errors.name && <small className="p-error">{errors.name.message}</small>}
                </>
              )}
            />
          </div>
          <div className="col-6">
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <>
                  <InputText {...field} placeholder="Location" className="w-full" />
                  {errors.location && <small className="p-error">{errors.location.message}</small>}
                </>
              )}
            />
          </div>
        </div>
        <div className="grid">
          <div className="col-6">
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <>
                  <InputText {...field} placeholder="Address" className="w-full" />
                  {errors.address && <small className="p-error">{errors.address.message}</small>}
                </>
              )}
            />
          </div>
          <div className="col-6">
            <Controller
              name="organizer"
              control={control}
              rules={{ required: "Organizer Name is required" }}
              render={({ field }) => (
                <>
                  <InputText {...field} placeholder="Organizer" className="w-full" />
                  {errors.organizer && <small className="p-error">{errors.organizer.message}</small>}
                </>
              )}
            />
          </div>
        </div>
        <div className="grid">
          <div className="col-6">
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <>
                  <InputText {...field} placeholder="Date (YYYY-MM-DD)" className="w-full" />
                  {errors.date && <small className="p-error">{errors.date.message}</small>}
                </>
              )}
            />
          </div>
          <div className="col-6">
            <Controller
              name="time"
              control={control}
              rules={{ required: "Time is required" }}
              render={({ field }) => (
                <>
                  <InputText {...field} placeholder="Time (HH:MM AM/PM)" className="w-full" />
                  {errors.time && <small className="p-error">{errors.time.message}</small>}
                </>
              )}
            />
          </div>
        </div>
        <div className="grid">
          <div className="col-6">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Dropdown {...field} options={Object.values(EventType)} onChange={(e) => field.onChange(e.value)} placeholder="Event Type" className="w-full" />
              )}
            />
          </div>
        </div>
        <div className="flex justify-content-end mt-3">
          <Button label="Cancel" className="p-button-text" onClick={onHide}/>
          <Button type="submit" label={defaultValues?.id ? "Update Event" : "Add Event"} className="p-button-success" />
        </div>
      </form>
    </Dialog>
  );
};

export { CreateEvent };
