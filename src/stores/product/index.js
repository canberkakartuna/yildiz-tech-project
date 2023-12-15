import { create } from "zustand";

const useProductStore = create((set) => ({
  selectedAttributes: {},
  setSelectedAttributes: (group, selectedAttribute) =>
    set((state) => {
      const newAttributes = { ...state.selectedAttributes };

      if (newAttributes[group] === selectedAttribute) {
        delete newAttributes[group];
      } else {
        newAttributes[group] = selectedAttribute;
      }

      return { selectedAttributes: newAttributes };
    }),
}));

export default useProductStore;
