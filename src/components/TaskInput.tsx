import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCurrentTask, addTask } from '../redux/slices/taskSlice';

const TaskInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector(state => state.tasks.currentTask);

  const handleAddTask = () => {
    dispatch(addTask());
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="输入新任务"
        value={currentTask}
        onChangeText={(text: string) => dispatch(setCurrentTask(text))}
      />
      <Button title="添加" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { flexDirection: 'row', marginBottom: 20, marginTop: 10 },
  input: { flex: 1, borderWidth: 1, padding: 10, marginRight: 10 },
});

export default TaskInput;