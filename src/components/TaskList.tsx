import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import TaskItem from './TaskItem';
import { Task } from '../types';

const TaskList: React.FC = () => {
  const tasks = useAppSelector(state => state.tasks.tasks);

  return (
    <FlatList
      style={styles.list}
      data={tasks}
      renderItem={({ item }) => <TaskItem task={item} />}
      keyExtractor={(item: Task) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default TaskList;