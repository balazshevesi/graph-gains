import AddEntry from "@/components/AddEntry";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { PlusIcon } from "@heroicons/react/24/outline";

import { UserButton } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  return (
    <>
      <AddEntry />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-12">
        <div className="flex flex-col gap-4 ">
          <Card className="h-40 p-4">graph goes here</Card>
          <Card className="p-4">Entry goes here</Card>
          <Card className="p-4">Entry goes here</Card>
          <Card className="p-4">Entry goes here</Card>
          <Card className="p-4">Entry goes here</Card>
          <Card className="p-4">Entry goes here</Card>
        </div>
      </div>
    </>
  );
}
