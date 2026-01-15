import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { formatDistanceToNow, formatISO, isPast } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { normalizeStatus, statusStyle } from "@/lib/task";

export default function TaskItem({ task, onEdit, onDelete }) {
  const { title, description, status, dueDate } = task;
  const due = formatISO(dueDate);
  const dateIndecator = formatDistanceToNow(dueDate, { addSuffix: true });
  const isOverDue = isPast(due);

  return (
    <Card className="flex flex-col justify-between">
      <CardContent className="flex flex-col gap-3">
        <CardTitle>
          <p className={`text-xs ${isOverDue ? "text-red-500" : "text-inherit"}`}>{dateIndecator}</p>
          <h3 className="text-lg font-bold capitalize mb-1">{title}</h3>
        </CardTitle>
        <CardDescription>
          <p>{description}</p>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex items-end justify-between gap-6 w-full">
          <div className="">
            <Badge className={`capitalize ${statusStyle(status)}`}>{normalizeStatus(status)}</Badge>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button variant="ghost" size="icon-sm" onClick={onEdit}>
              <EditIcon />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="hover:bg-red-600 hover:text-white duration-150" size="icon-sm">
                  <TrashIcon />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete this task</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action can not be undone, this will permanently delete the chosen task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
