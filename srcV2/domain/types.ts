export type Person = { id: string; name: string };

export type Expense = {
  id: string;
  amount: number;
  paidBy: string;
  otherId: string;
  split: 'half' | 'full';
};

export type Settlement = {
  id: string;
  from: string;
  to: string;
  amount: number;
};

export type Ledger = {
  selfId: string;
  people: Person[];
  expenses: Expense[];
  settlements: Settlement[];
};
