import { create } from "zustand";

export const useFormCrearLlamada = create((set) => ({
    dataFormLlamada: {},
    methodCrearLlamada: (data) => {
        set((state) => {
            const newData = {
                ...state.dataFormLlamada,
                ...data
            };
            return {
                dataFormLlamada: newData
            };
        });
    },

    clearForm: () => {
        set({
            dataFormLlamada: {}
        });
    }
}));