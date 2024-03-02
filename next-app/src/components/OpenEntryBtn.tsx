"use client";

import { PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "./ui/button";
import useEntryModal from "@/zustand/useEntryModal";

export default function OpenEntryBtn() {
  const { open } = useEntryModal();

  return (
    <div className="fixed bottom-0 right-0 z-40 p-8">
      <Button variant="glow" onClick={() => open()}>
        <PlusIcon className="size-8 stroke-2" />
      </Button>
    </div>
  );
}
