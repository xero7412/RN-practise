import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import type { DetailsScreenProps } from '../navigation/types';

const DetailsScreen = ({ navigation, route }: DetailsScreenProps) => {
  const { itemId, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title ?? 'Details'}</Text>
      <Text style={styles.meta}>itemId: {itemId}</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonLabel}>Go back</Text>
      </Pressable>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  button: {
    backgroundColor: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
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
