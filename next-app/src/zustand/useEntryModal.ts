import { create } from "zustand";

interface UseEntryModal {
  isOpen: boolean;
  date: Date;
  entryId: number | undefined;
  weight: string | number | undefined;
  setDate: (value: Date) => void;
  setWeight: (value?: number) => void;
  open: Function;
  close: Function;
  images: string[];
  setImages: (value: string[]) => void;
}

const useEntryModal = create<UseEntryModal>((set) => ({
  isOpen: false,
  date: new Date(),
  images: ["", ""],
  setImages: (value: string[]) =>
    set((state) => {
      return { images: value };
    }),
  weight: undefined,
  entryId: undefined,
  setDate: (value: Date) =>
    set((state) => {
      return { date: value };
    }),
  setWeight: (value?: number | string) => set((state) => ({ weight: value })),
  open: ({ entryId }: { entryId?: number } = {}) => {
    return set((state) => {
      return {
        images: [],
        isOpen: true,
        entryId: entryId || undefined,
        date: entryId ? undefined : new Date(),
        weight: undefined,
      };
    });
  },
  close: () =>
    set((state) => {
      return {
        isOpen: false,
      };
    }),
}));
export default useEntryModal;
