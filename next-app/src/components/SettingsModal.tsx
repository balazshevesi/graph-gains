"use client";

import { useState } from "react";

import getCookie from "@/utils/getCookie";

import { CalendarIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

import { $refetchEntries } from "./Entries";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStore } from "@nanostores/react";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

export default function SettingsModal() {
  const refetchEntries = useStore($refetchEntries);
  const uploadFile = async ({ csvFile }: { csvFile: any }) => {
    const formData = new FormData();
    formData.append("file", csvFile); // 'file' is the key your backend expects

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE!}/import-csv`,
      {
        method: "post",
        body: formData,
        headers: { Authorization: `Bearer ${getCookie("__session")}` },
      },
    );

    if (!response.ok) throw new Error("Network response was not ok");

    refetchEntries();

    return await response.json();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [csvFile, setCsvFile] = useState<File>();

  const { data, isPending, mutate } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      setIsOpen(false);
      toast.success("success!");
      refetchEntries();
    },
  });

  return (
    <>
      <Button variant="secondary" size="icon" onClick={() => setIsOpen(true)}>
        <Cog6ToothIcon className=" size-8 stroke-2 text-gray-500" />
      </Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogTitle className="">Settings</DialogTitle>
          <DialogDescription className="space-y-4 pt-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Upload CSV Data From MyFittnesPal</Label>
              <Input
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) setCsvFile(files[0]);
                }}
                id="picture"
                type="file"
                accept=".csv"
              />
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button
              disabled={isPending}
              variant="glow"
              className=" flex items-center gap-1"
              onClick={() => mutate({ csvFile })}
              type="submit"
            >
              Upload
              {!!isPending && (
                <Loader2Icon className=" size-5 animate-spin stroke-2" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
