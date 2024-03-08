"use client";

import getCookie from "@/utils/getCookie";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

import MainChart from "./MainChart";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import useEntryModal from "@/zustand/useEntryModal";
import { edenFetch } from "@elysiajs/eden";
import { useQuery } from "@tanstack/react-query";
import { format, setDate } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { atom } from "nanostores";

export const $refetchEntries = atom<Function>(() => {});

//@ts-ignore
// const eFetch = edenFetch<App>(process.env.NEXT_PUBLIC_API_BASE);

export default function Entries() {
  const { open, setDate, setWeight } = useEntryModal();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["entries"],
    queryFn: async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/entries`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("__session")}`,
        },
      });
      return await data.json();
    },
  });

  if (!data) return <Loader2Icon className=" mx-auto size-8 animate-spin" />;
  if (data === "Unauthorized") return <div>Unauthorized</div>;

  $refetchEntries.set(refetch);

  const chartData = data.content.entries.map((entry) => ({
    timestamp: new Date(entry.date).toISOString(),
    value: entry.weight ? +entry.weight : 0,
    id: entry.id,
  }));

  return (
    <div>
      <div className="flex flex-col gap-4">
        {/* <Card className="h-40 p-4">graph goes here</Card> */}
        <MainChart data={chartData} />
        {data &&
          data.content.entries.map((entry) => {
            return (
              <Card key={entry.id} className="flex items-center p-4">
                <div>
                  <div className="mb-1 text-sm font-semibold text-gray-500">
                    {format(entry.date, "yyyy-MM-dd HH:mm")}
                  </div>
                  <div className="text-lg font-medium">{entry.weight} kg</div>
                </div>
                <div className="ml-auto">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => {
                      open({ entryId: entry.id });
                      setDate(entry.date);
                      setWeight(+entry.weight!);
                    }}
                  >
                    <EllipsisHorizontalIcon className=" size-8" />
                  </Button>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
