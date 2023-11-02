import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNameClientesForm = create(persist((set) => ({
  submitBusquedaCorreoClientes: false,
  toggleSubmitBusquedaClientes: () =>
    set((state) => ({
      submitBusquedaCorreoClientes: !state.submitBusquedaCorreoClientes,
    })),
})));



