import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Spinner } from "./ui/spinner";

export default function TaskForm(props) {
  const { task, open, onOpenChange, onSubmit, error, submitting } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    if (!open) return;
    if (task) {
      const { title, description, status, dueDate } = task;
      setTitle(title);
      setDescription(description);
      setStatus(status);
      setDueDate(new Date(dueDate));
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
      setDueDate(new Date());
    }
  }, [open]);

  const isEditMode = Boolean(task);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form
          onSubmit={(event) =>
            onSubmit(event, {
              title,
              description,
              status,
              dueDate,
            })
          }
        >
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Task" : "Create Task"}</DialogTitle>
            <DialogDescription>
              {isEditMode ? "Update the fields you want to edit." : "Fill up the fields below to create new task."}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-6">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                type="text"
                placeholder={isEditMode ? "Edit task title" : "Enter task title"}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                placeholder={isEditMode ? "Edit task description" : "Enter task description"}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select value={status} onValueChange={(value) => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder={isEditMode ? "Change status" : "Select a status"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Due Date</FieldLabel>
              <DatePicker date={dueDate} setDate={setDueDate} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner />
                  <span>Saving...</span>
                </>
              ) : (
                "save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DatePicker({ date = undefined, setDate }) {
  const [open, setOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild data-empty={!date} className="data-[empty=true]:text-muted-foreground">
        <Button className="justify-between" variant="outline" id="date">
          {date ? format(date, "P") : <span>Select a date</span>}
          {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
          }}
          disabled={{ before: today }}
        />
      </PopoverContent>
    </Popover>
  );
}
