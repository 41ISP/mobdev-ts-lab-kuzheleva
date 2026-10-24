import { create } from "zustand";
import { INewPayment, IPayment } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";
import { nanoid } from "nanoid";

interface IPaymentsState{
items: IPayment[],
addPayment: (data: INewPayment) => void,
removePayment: (id: string) => void,
togglePaid: (id: string) => void
} 

export const usePaymentsStore = create<IPaymentsState>() (
    persist((set) => ({
items: [], 
addPayment: (data) => set(v => ({items: [...v.items, {...data, id: nanoid(), paid: false},]
,}
)),
removePayment: (id) => set(v => ({items: v.items.filter(
    e => e.id !== id),
})),
togglePaid: (id) => set(v => ({items: [...v.items.map((e) =>
 e.id === id ? { ...e, paid: !e.paid } : e )]}))
    }), {name: 'payments', storage: createJSONStorage(() => localStorage)
    },),
)