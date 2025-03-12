import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from './src/redux/store';
import { setTasks } from './src/redux/slices/taskSlice';
import TaskInput from './src/components/TaskInput';
import TaskList from './src/components/TaskList';
import StatsTable from './src/components/StatsTable';
import { Task } from './src/types';

const App: React.FC = () => {
  // 在应用启动时从AsyncStorage加载任务
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          const parsedTasks: Task[] = JSON.parse(savedTasks);
          store.dispatch(setTasks(parsedTasks));
        }
      } catch (error) {
        console.error('加载任务失败:', error);
      }
    };
    loadTasks();
  }, []);

  // 当任务状态变化时保存到AsyncStorage
  useEffect(() => {
    const saveTasksToStorage = async () => {
      try {
        const currentTasks = store.getState().tasks.tasks;
        await AsyncStorage.setItem('tasks', JSON.stringify(currentTasks));
      } catch (error) {
        console.error('保存任务失败:', error);
      }
    };

    // 订阅store变化
    const unsubscribe = store.subscribe(() => {
      saveTasksToStorage();
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <View style={styles.todoTitle}>
          <Text style={styles.titleText}>TODO</Text>
        </View>
        <TaskInput />
        <StatsTable />
        <TaskList />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  todoTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default App;
