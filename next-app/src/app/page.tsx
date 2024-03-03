import Entries from "@/components/Entries";
import EntryModal from "@/components/EntryModal";
import OpenEntryBtn from "@/components/OpenEntryBtn";
import { Card } from "@/components/ui/card";

export default async function Home() {
  return (
    <>
      <OpenEntryBtn />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-12">
        <Entries />
      </div>
    </>
  );
}
