import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';

interface TaskState {
  tasks: Task[];
  currentTask: string;
  editingId: string | null;
  editingText: string;
}

const initialState: TaskState = {
  tasks: [],
  currentTask: '',
  editingId: null,
  editingText: ''
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // 设置任务列表
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    // 设置当前输入的任务
    setCurrentTask: (state, action: PayloadAction<string>) => {
      state.currentTask = action.payload;
    },
    // 添加任务
    addTask: (state) => {
      if (state.currentTask.trim()) {
        state.tasks.push({
          id: Date.now().toString(),
          text: state.currentTask,
          completed: false
        });
        state.currentTask = '';
      }
    },
    // 删除任务
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    // 切换任务完成状态
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    // 开始编辑任务
    startEditTask: (state, action: PayloadAction<{id: string, text: string}>) => {
      state.editingId = action.payload.id;
      state.editingText = action.payload.text;
    },
    // 更新编辑中的文本
    setEditingText: (state, action: PayloadAction<string>) => {
      state.editingText = action.payload;
    },
    // 保存编辑
    saveEdit: (state) => {
      if (state.editingId) {
        const task = state.tasks.find(task => task.id === state.editingId);
        if (task) {
          task.text = state.editingText;
        }
        state.editingId = null;
        state.editingText = '';
      }
    },
    // 取消编辑
    cancelEdit: (state) => {
      state.editingId = null;
      state.editingText = '';
    }
  }
});

export const {
  setTasks,
  setCurrentTask,
  addTask,
  deleteTask,
  toggleComplete,
  startEditTask,
  setEditingText,
  saveEdit,
  cancelEdit
} = taskSlice.actions;

export default taskSlice.reducer;