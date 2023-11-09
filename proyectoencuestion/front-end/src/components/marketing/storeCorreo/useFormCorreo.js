import { create } from "zustand";

export const useFormCorreo = create((set) => ({
    dataCorreoForm: {},
    methodAddDataFormCorreo: (data) => {
        set((state) => {
            const newData = {
                ...state.dataCorreoForm,
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