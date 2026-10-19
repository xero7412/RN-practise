import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import type { ExpenseScreenProps } from '../navigation/types';
import { useSplitStore } from '../store/splitStore';
import type { Expense } from '../domain/types';

const SPLIT_OPTIONS = [
  { value: 'owed_50', label: 'I paid, split 50%' },
  { value: 'owes_50', label: 'They paid, split 50%' },
  { value: 'paid_100', label: 'I paid 100% for them' },
  { value: 'receives_100', label: 'They paid 100% for me' },
] as const;

type SplitChoice = (typeof SPLIT_OPTIONS)[number]['value'];

const toExpense = (
  selfId: string,
  otherId: string,
  amount: number,
  choice: SplitChoice,
): Omit<Expense, 'id'> => {
  switch (choice) {
    case 'owed_50':
      return { amount, paidBy: selfId, otherId, split: 'half' };
    case 'owes_50':
      return { amount, paidBy: otherId, otherId: selfId, split: 'half' };
    case 'paid_100':
      return { amount, paidBy: selfId, otherId, split: 'full' };
    case 'receives_100':
      return { amount, paidBy: otherId, otherId: selfId, split: 'full' };
  }
};

const ExpenseScreen = ({ navigation }: ExpenseScreenProps) => {
  const ledger = useSplitStore(state => state.ledger);
  const addExpense = useSplitStore(state => state.addExpense);
  const others = ledger.people.filter(person => person.id !== ledger.selfId);

  const [amount, setAmount] = useState('');
  const [splitType, setSplitType] = useState<SplitChoice>('owed_50');
  const [otherId, setOtherId] = useState(others[0]?.id ?? '');

  const onSaveExpense = () => {
    const parsed = Number(amount);
    if (!parsed || !otherId) {
      return;
    }
    addExpense(toExpense(ledger.selfId, otherId, parsed, splitType));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="enter amount"
        keyboardType="decimal-pad"
        style={styles.inputBox}
      />
      <Text style={styles.groupLabel}>split type</Text>
      {SPLIT_OPTIONS.map(option => {
        const selected = splitType === option.value;
        return (
          <Pressable
            key={option.value}
            style={styles.radioRow}
            onPress={() => setSplitType(option.value)}
          >
            <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
              {selected && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>{option.label}</Text>
          </Pressable>
        );
      })}

      <Text style={styles.groupLabel}>with</Text>
      {others.map(person => {
        const selected = otherId === person.id;
        return (
          <Pressable
            key={person.id}
            style={styles.radioRow}
            onPress={() => setOtherId(person.id)}
          >
            <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
              {selected && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>{person.name}</Text>
          </Pressable>
        );
      })}

      <Pressable style={styles.button} onPress={onSaveExpense}>
        <Text>Save Expense</Text>
      </Pressable>
    </View>
  );
};

export default ExpenseScreen;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: 'coral',
    marginTop: 16,
  },
  inputBox: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
  container: {
    margin: 10,
  },
  groupLabel: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioOuterSelected: {
    borderColor: '#2563eb',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
  },
  radioLabel: {
    fontSize: 16,
  },
});
