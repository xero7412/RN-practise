import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import type { DetailsScreenProps } from '../navigation/types';
import { useSplitStore } from '../store/splitStore';
import { money, personHistory } from '../domain/selectors';
import { netBetween } from '../domain/reducers';

const DetailsScreen = ({ navigation, route }: DetailsScreenProps) => {
  const { personId } = route.params;
  const ledger = useSplitStore(state => state.ledger);
  const settleUp = useSplitStore(state => state.settleUp);
  const removeExpense = useSplitStore(state => state.removeExpense);

  const person = ledger.people.find(item => item.id === personId);
  const net = netBetween(ledger, personId);
  const history = personHistory(ledger, personId);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{person?.name ?? 'Details'}</Text>
      <Text style={styles.meta}>
        {net === 0
          ? 'settled up'
          : net > 0
            ? `owes you ${money(net)}`
            : `you owe ${money(net)}`}
      </Text>

      {history.map(item => (
        <View key={item.id} style={styles.row}>
          <Text>{item.label}</Text>
          {item.kind === 'expense' && (
            <Pressable onPress={() => removeExpense(item.id)}>
              <Text style={styles.remove}>remove</Text>
            </Pressable>
          )}
        </View>
      ))}

      {net !== 0 && (
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => settleUp(personId)}
        >
          <Text style={styles.buttonLabel}>Settle up</Text>
        </Pressable>
      )}
      <Pressable
        style={({ pressed }) => [styles.back, pressed && styles.buttonPressed]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonLabel}>Go back</Text>
      </Pressable>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  meta: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 24,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  remove: {
    color: '#b91c1c',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  back: {
    backgroundColor: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
