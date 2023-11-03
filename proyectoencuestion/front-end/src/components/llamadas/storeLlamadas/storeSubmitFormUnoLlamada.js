import { create } from "zustand";

export const useSubmitFormUnoLlamada = create((set) => ({
    isFormUnoCompleted: false,
    toggleFormUno: () => {
        set((state) => ({
            isFormUnoCompleted: !state.isFormUnoCompleted
        }))
    }

}))