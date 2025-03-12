import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';

const StatsTable: React.FC = () => {
  const tasks = useAppSelector(state => state.tasks.tasks);
  
  // 计算统计数据
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const incompleteTasks = totalTasks - completedTasks;

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.firstColumn]}>统计项</Text>
        <Text style={styles.headerCell}>数量</Text>
      </View>
      
      <View style={styles.tableRow}>
        <Text style={[styles.cell, styles.firstColumn]}>总任务数</Text>
        <Text style={styles.cell}>{totalTasks}</Text>
      </View>
      
      <View style={styles.tableRow}>
        <Text style={[styles.cell, styles.firstColumn]}>已完成</Text>
        <Text style={styles.cell}>{completedTasks}</Text>
      </View>
      
      <View style={styles.tableRow}>
        <Text style={[styles.cell, styles.firstColumn]}>未完成</Text>
        <Text style={styles.cell}>{incompleteTasks}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    padding: 10,
    textAlign: 'center',
    flex: 1,
  },
  firstColumn: {
    flex: 2,
    textAlign: 'left',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
});

export default StatsTable;