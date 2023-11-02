import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useCampanas = create(persist((set) => ({
    correosEnviados : 0,

    addCorreosEnviados : () => set((state) => ({
        correosEnviados : state.correosEnviados + 1
    })),
    
    removeCorreosEnviados : () => set((state) => ({
        correosEnviados : state.correosEnviados - 1
    }))
}), 
{
    name : 'correos-campanas'
}))