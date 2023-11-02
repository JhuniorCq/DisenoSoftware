import { create } from "zustand";

export const useCrearLlamada = create((set) => ({
    iscrearLlamadaPressed: false,
    toggleCrearLlamada: () => {
        set((state) => ({
            iscrearLlamadaPressed: !state.iscrearLlamadaPressed
        }))
    }

}))