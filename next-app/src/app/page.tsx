import Entries from "@/components/Entries";
import EntryModal from "@/components/EntryModal";
import OpenEntryBtn from "@/components/OpenEntryBtn";
import { Card } from "@/components/ui/card";

export default async function Home() {
  return (
    <>
      <OpenEntryBtn />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-12">
        {/* <div className="flex flex-col gap-4">
          <Card className="h-40 p-4">graph goes here</Card>
          <Card className="p-4">Entry goes here</Card>
          <Card className="p-4">Entry goes here</Card>
          <Card className="p-4">Entry goes here</Card>
          <Card className="p-4">Entry goes here</Card>
          <Card className="p-4">Entry goes here</Card>
        </div> */}
        <Entries />
      </div>
    </>
  );
}
