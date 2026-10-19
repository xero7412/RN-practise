import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { User } from '../Store/SplitStore';

const UserList = ({
  user,
  onPress,
}: {
  user: User;
  onPress: (user: string) => void;
}) => {
  const onPressHandler = () => {
    onPress(user.user);
  };

  const getStyle = () => {
    return user.type === 'negative' ? 'red' : 'green';
  };
  return (
    <Pressable style={styles.container} onPress={onPressHandler}>
      <Text>{user.user}</Text>
      <Text style={{ color: getStyle() }}>{user.balance}</Text>
    </Pressable>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    fontSize: 14,
    margin: 10,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
