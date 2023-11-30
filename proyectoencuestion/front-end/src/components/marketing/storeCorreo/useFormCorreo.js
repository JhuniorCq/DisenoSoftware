import { create } from "zustand";

export const useFormCorreo = create((set) => ({
    dataCorreoForm: {},
    methodAddDataFormCorreo: (data) => {
        set((state) => {
            const newData = {
                ...data
            };
            return {
                dataCorreoForm: newData
            }
        });
    },
    clearFormCorreo: () => {
        set({
            dataCorreoForm: {}
        });
    }
})
)