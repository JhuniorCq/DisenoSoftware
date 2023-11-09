import { create } from "zustand";

export const useCloseFormCorreo = create((set) => ({
    isFormCorreoCompleted: false,
    toggleStateFormCorreo: () => {
        set((state) => ({
            isFormCorreoCompleted: !state.isFormCorreoCompleted
        }));
    }

})
)

export const useSendDataFormCorreo = create((set) => ({
    isFormCorreoCompletedSendData: false,
    toggleStateFormCorreoSendData: () => {
        set((state) => ({
            isFormCorreoCompletedSendData: !state.isFormCorreoCompletedSendData
        }));
    }

})
)