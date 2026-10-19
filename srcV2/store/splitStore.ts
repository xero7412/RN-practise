import { create } from 'zustand';
import { addExpense, removeExpense, seedLedger, settleUp } from '../domain/reducers';
import type { Expense, Ledger } from '../domain/types';

type SplitStore = {
  ledger: Ledger;
  addExpense: (input: Omit<Expense, 'id'>) => void;
  settleUp: (personId: string) => void;
  removeExpense: (id: string) => void;
};

export const useSplitStore = create<SplitStore>((set, get) => ({
  ledger: seedLedger(),
  addExpense: input => set({ ledger: addExpense(get().ledger, input) }),
  settleUp: personId => set({ ledger: settleUp(get().ledger, personId) }),
  removeExpense: id => set({ ledger: removeExpense(get().ledger, id) }),
}));
