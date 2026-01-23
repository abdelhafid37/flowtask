import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { formatDistanceToNow, isPast } from "date-fns";
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
import { Spinner } from "./ui/spinner";

export default function TaskItem({ task, setIsOpen, setSelectedTask, onDelete, submitting }) {
  const { title, description, status, dueDate } = task;

  const dateIndecator = formatDistanceToNow(new Date(dueDate), { addSuffix: true });
  const isOverDue = isPast(new Date(dueDate));

  return (
    <Card className="flex flex-col justify-between bg-muted">
      <CardContent className="flex flex-col gap-3">
        <CardTitle>
          <p className={`text-xs ${isOverDue ? "line-through opacity-50" : "text-inherit"}`}>{dateIndecator}</p>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
        </CardTitle>
        <CardDescription>
          <p className="wrap-anywhere">{description}</p>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between gap-6 w-full">
          <div className="">
            <Badge className={`capitalize ${statusStyle(status)}`}>{normalizeStatus(status)}</Badge>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setSelectedTask(task);
                setIsOpen(true);
              }}
            >
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
                  <AlertDialogDescription className="max-w-[40ch]">
                    This action can not be undone, this will permanently delete the chosen task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(task._id)} disabled={submitting}>
                    {submitting ? (
                      <>
                        <Spinner />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
