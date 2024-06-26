"use client";

import { headers } from "next/headers";

import { useMemo, useState } from "react";

import app from "@/utils/edenTreaty";
import getCookie from "@/utils/getCookie";

import { Checkbox } from "@/components/ui/checkbox";

import { EllipsisHorizontalIcon, PhotoIcon } from "@heroicons/react/24/outline";

import MainChart from "./MainChart";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import useEntryModal from "@/zustand/useEntryModal";
import { useQuery } from "@tanstack/react-query";
import { format, setDate } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { atom } from "nanostores";

export const $refetchEntries = atom<Function>(() => {});

function addDays(date: Date, daysToAdd: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + daysToAdd);
  return result;
}

export default function Entries() {
  const [selectedView, setSelectedView] = useState("all");
  const [showTrendline, setShowTrendline] = useState(false);
  const [showRounded, setShowRounded] = useState(false);

  const { open, setDate, setWeight, setImages } = useEntryModal();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["entries"],
    queryFn: async () => {
      const { data } = await app.entries.get({
        headers: { Authorization: `Bearer ${getCookie("__session")}` },
      });
      return data;
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
    if (!chartData || !data || data === "Unauthorized") return;

    const now = new Date();
    if (selectedView === "all") return chartData;
    const filteredData = chartData.filter(
      (entry) =>
        new Date(entry.timestamp) >
        addDays(
          now,
          selectedView === "month"
            ? -30
            : selectedView === "week"
              ? -7
              : selectedView === "6 months"
                ? -168
                : selectedView === "year"
                  ? -360
                  : selectedView === "two weeks"
                    ? -14
                    : 0,
        ),
    );
    return filteredData;
  }, [data, chartData, selectedView]);

  if (!data) return <Loader2Icon className="mx-auto size-8 animate-spin" />;
  if (data === "Unauthorized") return <div>Unauthorized</div>;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 overflow-x-auto p-2">
          <div className="mr-auto" />
          <div className="flex items-center space-x-2">
            <Checkbox
              className="rounded"
              id="showRounded"
              checked={showRounded}
              onCheckedChange={(e: boolean) => setShowRounded(e)}
            />
            <label
              htmlFor="showRounded"
              className="text-sm font-medium leading-none"
            >
              Rounded
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              className="rounded"
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
            onClick={() => setSelectedView("year")}
            variant={selectedView === "year" ? "outline" : "secondary"}
          >
            Year
          </Button>
          <Button
            size="sm"
            onClick={() => setSelectedView("6 months")}
            variant={selectedView === "6 months" ? "outline" : "secondary"}
          >
            6 months
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
            onClick={() => setSelectedView("two weeks")}
            variant={selectedView === "two weeks" ? "outline" : "secondary"}
          >
            Two Weeks
          </Button>
          <Button
            size="sm"
            onClick={() => setSelectedView("week")}
            variant={selectedView === "week" ? "outline" : "secondary"}
          >
            Week
          </Button>
        </div>
        <div className="h-[50vh] w-full">
          <MainChart
            showRounded={showRounded}
            showTrendline={showTrendline}
            data={filteredChartData || []}
          />
        </div>
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
                <div className="ml-auto flex items-center gap-4">
                  {!!entry.images.length && (
                    <div>
                      <PhotoIcon className="size-8" />
                    </div>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => {
                      open({ entryId: entry.id });
                      setImages(entry.images.map(({ path }) => path));
                      setDate(entry.date);
                      setWeight(+entry.weight!);
                    }}
                  >
                    <EllipsisHorizontalIcon className="size-8" />
                  </Button>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
