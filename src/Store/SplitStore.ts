import { create } from 'zustand';

export type User = {
  user: string;
  balance: number;
  type: 'negative' | 'positive';
};

export type Transaction = {
  totalAmount: number;
  balance: number;
  type: 'owed_50' | 'owes_50' | 'paid_100' | 'receives_100';
  withUser: string;
  balanceType: 'receive' | 'pay';
  paidBy: 'self' | 'other';
};

type SplitState = {
  userList: User[];
  transactions: Transaction[];
  addNewTransaction: (txn: Transaction) => void;
  updateUserList: (nextUserList: User[]) => void;
};

export const useSplitStore = create<SplitState>(function (set) {
  return {
    userList: [
      {
        user: 'user 1',
        balance: 200,
        type: 'negative',
      },
      {
        user: 'user 2',
        balance: 200,
        type: 'positive',
      },
      {
        user: 'user 3',
        balance: 200,
        type: 'negative',
      },
    ],
    transactions: [
      {
        totalAmount: 300,
        paidBy: 'self',
        type: 'owed_50',
        withUser: 'User 1',
        balance: 150,
        balanceType: 'receive',
      },
      {
        totalAmount: 300,
        paidBy: 'self',
        type: 'owes_50',
        withUser: 'User 2',
        balance: 300,
        balanceType: 'receive',
      },
      {
        totalAmount: 300,
        paidBy: 'self',
        type: 'paid_100',
        withUser: 'User 1',
        balance: 150,
        balanceType: 'receive',
      },
    ],
    addNewTransaction: function (txn) {
      set(function (state) {
        return { transactions: state.transactions.concat(txn) };
      });
    },
    updateUserList: function (nextUserList) {
      set({ userList: nextUserList });
    },
  };
});
