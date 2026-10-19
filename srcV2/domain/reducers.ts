import type { Expense, Ledger } from './types';

const uid = () => Math.random().toString(36).slice(2, 8);

export function addExpense(
  ledger: Ledger,
  input: Omit<Expense, 'id'>,
): Ledger {
  if (input.amount <= 0 || input.paidBy === input.otherId) {
    return ledger;
  }
  return {
    ...ledger,
    expenses: [...ledger.expenses, { ...input, id: uid() }],
  };
}

export function settleUp(ledger: Ledger, personId: string): Ledger {
  const net = netBetween(ledger, personId);
  if (net === 0) {
    return ledger;
  }
  return {
    ...ledger,
    settlements: [
      ...ledger.settlements,
      {
        id: uid(),
        from: net > 0 ? personId : ledger.selfId,
        to: net > 0 ? ledger.selfId : personId,
        amount: Math.abs(net),
      },
    ],
  };
}

export function removeExpense(ledger: Ledger, id: string): Ledger {
  return {
    ...ledger,
    expenses: ledger.expenses.filter(expense => expense.id !== id),
  };
}

export function seedLedger(): Ledger {
  const selfId = 'self';
  let ledger: Ledger = {
    selfId,
    people: [
      { id: selfId, name: 'You' },
      { id: 'p1', name: 'user 1' },
      { id: 'p2', name: 'user 2' },
      { id: 'p3', name: 'user 3' },
    ],
    expenses: [],
    settlements: [],
  };

  ledger = addExpense(ledger, {
    amount: 300,
    paidBy: selfId,
    otherId: 'p1',
    split: 'half',
  });
  ledger = addExpense(ledger, {
    amount: 300,
    paidBy: 'p2',
    otherId: selfId,
    split: 'half',
  });
  return ledger;
}

/** + they owe you, − you owe them */
export function netBetween(ledger: Ledger, personId: string): number {
  const share = (expense: Expense) =>
    expense.split === 'full' ? expense.amount : expense.amount / 2;

  let net = 0;
  for (const expense of ledger.expenses) {
    if (expense.paidBy === ledger.selfId && expense.otherId === personId) {
      net += share(expense);
    }
    if (expense.paidBy === personId && expense.otherId === ledger.selfId) {
      net -= share(expense);
    }
  }
  for (const settlement of ledger.settlements) {
    if (settlement.from === personId && settlement.to === ledger.selfId) {
      net -= settlement.amount;
    }
    if (settlement.from === ledger.selfId && settlement.to === personId) {
      net += settlement.amount;
    }
  }
  return net;
}
