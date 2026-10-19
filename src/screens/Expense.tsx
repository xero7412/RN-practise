import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { userList } from '../utils/Constants';
import { ExpenseCalculator } from '../utils/ExpenseCalculator';
import type { ExpenseScreenProps } from '../navigation/types';

const SPLIT_OPTIONS = [
  { value: 'owed_50', label: 'owed 50%' },
  { value: 'owes_50', label: 'owes 50%' },
  { value: 'paid_100', label: 'paid 100%' },
  { value: 'receives_100', label: 'receives 100%' },
] as const;

type SplitType = (typeof SPLIT_OPTIONS)[number]['value'];

const Expense = ({ navigation }: ExpenseScreenProps) => {
  const [amount, setAmount] = useState('');
  const [splitType, setSplitType] = useState<SplitType>('owed_50');
  const [selectedUser, setSelectedUser] = useState('user 1');

  const onSaveExpense = () => {
    const parsedAmount = Number(amount);
    if (!parsedAmount) {
      return;
    }

    ExpenseCalculator(selectedUser, parsedAmount, splitType);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="enter amount"
        keyboardType="number-pad"
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
            <View
              style={[styles.radioOuter, selected && styles.radioOuterSelected]}
            >
              {selected && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>{option.label}</Text>
          </Pressable>
        );
      })}

      <Text style={styles.groupLabel}>split type</Text>
      {userList.map(option => {
        const selected = selectedUser === option;
        return (
          <Pressable
            key={option}
            style={styles.radioRow}
            onPress={() => setSelectedUser(option)}
          >
            <View
              style={[styles.radioOuter, selected && styles.radioOuterSelected]}
            >
              {selected && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>{option}</Text>
          </Pressable>
        );
      })}

      <Pressable style={styles.button} onPress={onSaveExpense}>
        <Text>Save Expense</Text>
      </Pressable>
    </View>
  );
};

export default Expense;
const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: 'coral',
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
