import { create } from "zustand";

interface UseEntryModal {
  isOpen: boolean;
  date: Date;
  entryId: number | undefined;
  weight: number | undefined;
  setDate: (value: Date) => void;
  setWeight: (value?: number) => void;
  open: ({ entryId }?: { entryId?: number }) => void;
  close: Function;
}

const useEntryModal = create<UseEntryModal>((set) => ({
  isOpen: false,
  date: new Date(),
  weight: undefined,
  entryId: undefined,
  setDate: (value: Date) =>
    set((state) => {
      return { date: value };
    }),
  setWeight: (value?: number) => set((state) => ({ weight: value })),
  open: ({ entryId }: { entryId?: number } = {}) => {
    return set((state) => {
      return {
        isOpen: true,
        entryId: entryId || undefined,
        date: entryId ? undefined : new Date(),
      };
    });
  },
  close: () =>
    set((state) => {
      return {
        isOpen: false,
        weight: undefined,
        entryId: undefined,
        date: undefined,
      };
    }),
}));
export default useEntryModal;
