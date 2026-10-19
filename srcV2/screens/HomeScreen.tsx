import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import type { HomeScreenProps } from '../navigation/types';
import PersonRow from '../components/PersonRow';
import { useSplitStore } from '../store/splitStore';
import { personBalances } from '../domain/selectors';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const ledger = useSplitStore(state => state.ledger);
  const people = personBalances(ledger);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('Expense')}
      >
        <Text style={styles.buttonLabel}>add new expense</Text>
      </Pressable>
      {people.map(person => (
        <PersonRow
          key={person.id}
          person={person}
          onPress={personId => navigation.navigate('Details', { personId })}
        />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 4,
    width: '50%',
    alignSelf: 'center',
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
