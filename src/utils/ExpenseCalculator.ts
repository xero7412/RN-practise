import {
  Transaction,
  User,
  useSplitStore,
} from '../Store/SplitStore';

export type ExpenseType = Transaction['type'];

const getSplitDetails = (
  amount: number,
  expenseType: ExpenseType,
): Pick<Transaction, 'balance' | 'balanceType' | 'paidBy'> => {
  switch (expenseType) {
    case 'owed_50':
      return { balance: amount / 2, balanceType: 'receive', paidBy: 'self' };
    case 'owes_50':
      return { balance: amount / 2, balanceType: 'pay', paidBy: 'other' };
    case 'paid_100':
      return { balance: amount, balanceType: 'receive', paidBy: 'self' };
    case 'receives_100':
      return { balance: amount, balanceType: 'pay', paidBy: 'other' };
  }
};

export const userListOperator = (userId: string, txn: Transaction) => {
  const { userList, updateUserList } = useSplitStore.getState();
  const delta = txn.balanceType === 'receive' ? txn.balance : -txn.balance;

  const updatedUserList = userList.map((user: User) => {
    if (user.user !== userId) {
      return user;
    }

    const current = user.type === 'positive' ? user.balance : -user.balance;
    const next = current + delta;

    return {
      ...user,
      balance: Math.abs(next),
      type: next >= 0 ? ('positive' as const) : ('negative' as const),
    };
  });

  updateUserList(updatedUserList);
};

export const ExpenseCalculator = (
  userId: string,
  amount: number,
  expenseType: ExpenseType,
) => {
  const txn: Transaction = {
    totalAmount: amount,
    withUser: userId,
    type: expenseType,
    ...getSplitDetails(amount, expenseType),
  };

  useSplitStore.getState().addNewTransaction(txn);
  userListOperator(userId, txn);

  return txn;
};
