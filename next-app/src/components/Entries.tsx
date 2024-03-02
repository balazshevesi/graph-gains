"use client";

import getCookie from "@/utils/getCookie";

import type { App } from "../../../server/src/index";
import { Card } from "./ui/card";
import { edenFetch } from "@elysiajs/eden";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2Icon } from "lucide-react";

//@ts-ignore
const eFetch = edenFetch<App>(process.env.NEXT_PUBLIC_API_BASE);

export default function Entries() {
  const { data, isLoading } = useQuery({
    queryKey: ["entries"],
    queryFn: async () => {
      const data = await eFetch("/entries", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("__session")}`,
        },
      });
      console.log(data);
      return data;
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Card className="h-40 p-4">graph goes here</Card>
        {isLoading && <Loader2Icon className=" mx-auto size-8 animate-spin" />}
        {data &&
          data.data !== "Unauthorized" &&
          data.data &&
          data.data.content.entries.map((entry) => {
            return (
              <Card key={entry.id} className="p-4">
                <div>{format(entry.date, "yyyy-MM-dd HH:mm")}</div>
                <div>{entry.weight}</div>
              </Card>
            );
          })}
        {/* <Card className="p-4">Entry goes here</Card>
        <Card className="p-4">Entry goes here</Card>
        <Card className="p-4">Entry goes here</Card>
        <Card className="p-4">Entry goes here</Card>
        <Card className="p-4">Entry goes here</Card> */}
      </div>
    </div>
  );
}
