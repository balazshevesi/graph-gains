import { create } from "zustand";

interface UseEntryModal {
  isOpen: boolean;
  date: Date;
  weight: number | undefined;
  setDate: Function;
  setWeight: Function;
  open: Function;
  close: Function;
}

const useEntryModal = create<UseEntryModal>((set) => ({
  isOpen: false,
  date: new Date(),
  weight: undefined,
  setDate: (value: Date) =>
    set((state) => {
      return { date: value };
    }),
  setWeight: (value: number) => set((state) => ({ weight: value })),
  open: () => set((state) => ({ isOpen: true })),
  close: () => set((state) => ({ isOpen: false })),
}));
export default useEntryModal;
