"use client";

import { useMemo } from "react";

import app from "@/utils/edenTreaty";
import getCookie from "@/utils/getCookie";

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

import { $refetchEntries } from "./Entries";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import useEntryModal from "@/zustand/useEntryModal";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

const makeEntry = async ({ date, weight }: { date: Date; weight: number }) => {
  const { data, error } = await app.entry.post(
    { date, weight },
    { headers: { Authorization: `Bearer ${getCookie("__session")}` } },
  );
};

interface UpdateEntry {
  date: Date;
  weight: number;
  id: number;
}
const updateEntry = async ({ date, weight, id }: UpdateEntry) => {
  const { data, error } = await app
    .entry({ id })
    .put(
      { date, weight },
      { headers: { Authorization: `Bearer ${getCookie("__session")}` } },
    );
};

const deleteEntry = async ({ id }: { id: number }) => {
  const { data, error } = await app
    .entry({ id })
    .delete({ headers: { Authorization: `Bearer ${getCookie("__session")}` } });
};

export default function EntryModal() {
  const refetchEntries = useStore($refetchEntries);

  const { isOpen, open, close, date, weight, setDate, setWeight, entryId } =
    useEntryModal();

  console.log(weight);

  const { data, isPending, mutate } = useMutation({
    mutationFn: entryId ? updateEntry : makeEntry,
    onSuccess: () => {
      close();
      toast.success("success!");
      refetchEntries();
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteEntry,
    onSuccess: () => {
      close();
      toast.success("success!");
      refetchEntries();
    },
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => close(false)}>
        <DialogContent>
          <DialogTitle className="">
            {entryId ? "Edit entry" : "Add new entry"}
          </DialogTitle>
          <DialogDescription className="space-y-4 pt-2">
            <div>
              <Label className="mb-1.5 block">Date</Label>
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
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="mb-1.5 block" htmlFor="Weight">
                Weight
              </Label>
              <Input
                id="Weight"
                value={weight}
                onInput={(e: any) => {
                  const newValue = e.target.value.replace(",", ".");
                  if (/^\d*\.?\d*$/.test(newValue)) {
                    setWeight(newValue);
                  }
                }}
                inputMode="decimal"
                // type="number"
                placeholder="Weight"
              />
            </div>
          </DialogDescription>
          <DialogFooter>
            {!!entryId && (
              <Button
                disabled={isPending || deleteMut.isPending}
                variant="destructive"
                className="mt-2 flex items-center gap-1 sm:mt-0"
                onClick={() => deleteMut.mutate({ id: entryId! })}
                type="submit"
              >
                Delete
                {!!deleteMut.isPending && (
                  <Loader2Icon className="size-5 animate-spin stroke-2" />
                )}
              </Button>
            )}
            <Button
              disabled={isPending || deleteMut.isPending}
              variant="glow"
              className="flex items-center gap-1"
              onClick={() =>
                mutate({ date, weight: +weight! || 0, id: entryId! })
              }
              type="submit"
            >
              {entryId ? "Edit" : "Add"}
              {!!isPending && (
                <Loader2Icon className="size-5 animate-spin stroke-2" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
