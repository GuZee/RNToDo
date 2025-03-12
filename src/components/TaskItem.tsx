import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleComplete, deleteTask, startEditTask, setEditingText, saveEdit } from '../redux/slices/taskSlice';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const { editingId, editingText } = useAppSelector(state => state.tasks);
  const isEditing = editingId === task.id;

  const handleToggleComplete = () => {
    dispatch(toggleComplete(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleEdit = () => {
    dispatch(startEditTask({ id: task.id, text: task.text }));
  };

  const handleSaveEdit = () => {
    dispatch(saveEdit());
  };

  return (
    <View style={styles.taskItem}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editingText}
            onChangeText={(text) => dispatch(setEditingText(text))}
            autoFocus
          />
          <Button title="保存" onPress={handleSaveEdit} />
        </View>
      ) : (
        <>
          <TouchableOpacity onPress={handleToggleComplete}>
            <Text style={[styles.taskText, task.completed && styles.completed]}>
              {task.text}
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonsContainer}>
            <Button title="编辑" onPress={handleEdit} />
            <Button title="删除" onPress={handleDelete} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: { 
    backgroundColor: '#eee', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10,
    padding: 10
  },
  editContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
    backgroundColor: '#fff'
  },
  buttonsContainer: { 
    flexDirection: 'row' 
  },
  taskText: { 
    fontSize: 16 
  },
  completed: { 
    textDecorationLine: 'line-through', 
    color: 'gray' 
  },
});

export default TaskItem;