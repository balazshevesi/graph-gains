"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { PlusIcon, CalendarIcon } from "@heroicons/react/24/outline";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function AddEntry() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  return (
    <>
      <div className="fixed bottom-0 right-0 p-8">
        <Button onClick={() => setIsOpen(!isOpen)}>
          <PlusIcon className="size-8 stroke-2" />
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogTitle className="">Add new entry</DialogTitle>
          <DialogHeader>
            <DialogDescription className="space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(a: any) => setDate(a)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input type="Weight" placeholder="Weight" />
              {/* <Button>Add</Button> */}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}