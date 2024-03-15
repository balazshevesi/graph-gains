"use client";

import { useMemo, useState } from "react";

import getCookie from "@/utils/getCookie";

import { Checkbox } from "@/components/ui/checkbox";

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

function addDays(date: date, daysToAdd: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + daysToAdd);
  return result;
}

export default function Entries() {
  const [selectedView, setSelectedView] = useState("all");
  const [showTrendline, setShowTrendline] = useState(false);

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
  $refetchEntries.set(refetch);

  const chartData = useMemo(() => {
    if (!data || data === "Unauthorized") return;
    return data.content.entries.map((entry) => ({
      timestamp: new Date(entry.date).toISOString(),
      value: entry.weight ? +entry.weight : 0,
      id: entry.id,
    }));
  }, [data]);

  const filteredChartData = useMemo(() => {
    const now = new Date();
    if (!data || data === "Unauthorized") return;
    if (selectedView === "all") return chartData;
    const filteredData = chartData.filter(
      (entry) =>
        new Date(entry.timestamp) >
        addDays(
          now,
          selectedView === "month" ? -30 : selectedView === "week" ? -7 : 0,
        ),
    );
    return filteredData;
  }, [data, chartData, selectedView]);

  if (!data) return <Loader2Icon className="mx-auto size-8 animate-spin" />;
  if (data === "Unauthorized") return <div>Unauthorized</div>;

  return (
    <div>
      <div className="flex flex-col  gap-4">
        <div className="flex items-center justify-end gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              className=" rounded"
              id="showTrendLine"
              checked={showTrendline}
              onCheckedChange={(e: boolean) => setShowTrendline(e)}
            />
            <label
              htmlFor="showTrendLine"
              className="text-sm font-medium leading-none"
            >
              Trendline
            </label>
          </div>

          <Button
            size="sm"
            onClick={() => setSelectedView("all")}
            variant={selectedView === "all" ? "outline" : "secondary"}
          >
            All
          </Button>
          <Button
            size="sm"
            onClick={() => setSelectedView("month")}
            variant={selectedView === "month" ? "outline" : "secondary"}
          >
            Month
          </Button>
          <Button
            size="sm"
            onClick={() => setSelectedView("week")}
            variant={selectedView === "week" ? "outline" : "secondary"}
          >
            Week
          </Button>
        </div>
        <MainChart showTrendline={showTrendline} data={filteredChartData} />
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
