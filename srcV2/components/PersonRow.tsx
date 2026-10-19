import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { money } from '../domain/selectors';

const PersonRow = ({
  person,
  onPress,
}: {
  person: { id: string; name: string; net: number };
  onPress: (personId: string) => void;
}) => {
  const color = person.net < 0 ? 'red' : 'green';

  return (
    <Pressable style={styles.container} onPress={() => onPress(person.id)}>
      <Text>{person.name}</Text>
      <Text style={{ color }}>
        {person.net === 0 ? 'settled' : money(person.net)}
      </Text>
    </Pressable>
  );
};

export default PersonRow;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    margin: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
