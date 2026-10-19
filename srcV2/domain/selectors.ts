import type { Ledger } from './types';
import { netBetween } from './reducers';

export const money = (n: number) => `$${Math.abs(n).toFixed(2)}`;

export function personBalances(ledger: Ledger) {
  return ledger.people
    .filter(person => person.id !== ledger.selfId)
    .map(person => ({
      id: person.id,
      name: person.name,
      net: netBetween(ledger, person.id),
    }));
}

export function personHistory(ledger: Ledger, personId: string) {
  const nameOf = (id: string) =>
    ledger.people.find(person => person.id === id)?.name ?? id;

  const involves = (a: string, b: string) =>
    [a, b].includes(personId) && [a, b].includes(ledger.selfId);

  return [
    ...ledger.expenses
      .filter(expense => involves(expense.paidBy, expense.otherId))
      .map(expense => ({
        kind: 'expense' as const,
        id: expense.id,
        label: `${nameOf(expense.paidBy)} paid ${money(expense.amount)}`,
      })),
    ...ledger.settlements
      .filter(settlement => involves(settlement.from, settlement.to))
      .map(settlement => ({
        kind: 'settle' as const,
        id: settlement.id,
        label: `${nameOf(settlement.from)} settled ${money(settlement.amount)}`,
      })),
  ];
}
