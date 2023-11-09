import { create } from "zustand";

export const useSubmitFormsLlamada = create((set) => ({
    isFormUnoCompleted: false,
    toggleFormUno: () => {
        set((state) => ({
            isFormUnoCompleted: !state.isFormUnoCompleted
        }))
    }

}))