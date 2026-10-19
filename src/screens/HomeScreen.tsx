import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import type { HomeScreenProps } from '../navigation/types';
import UserList from '../components/UserList';
import { User, useSplitStore } from '../Store/SplitStore';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const onPressUser = (userName: string) => {
    navigation.navigate('Details', { title: userName, itemId: userName });
  };

  const userList = useSplitStore(state => state.userList);

  console.log(userList);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => navigation.navigate('Expense')}
      >
        <Text style={styles.buttonLabel}>add new expense</Text>
      </Pressable>

      {/* user list */}

      {userList?.map((user: User) => (
        <UserList user={user} onPress={onPressUser} />
      ))}
    </View>
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
  subtitle: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 24,
    textAlign: 'center',
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
// {
//   /* <Pressable
//         style={({ pressed }) => [
//           styles.button,
//           pressed && styles.buttonPressed,
//         ]}
//         onPress={() =>
//           navigation.navigate('Details', {
//             itemId: '42',
//             title: 'First item',
//           })
//         }
//       >
//         <Text style={styles.buttonLabel}>Go to Details</Text>
//       </Pressable> */
// }
