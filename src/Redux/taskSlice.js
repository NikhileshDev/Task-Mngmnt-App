// Redux Slice
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const newTask = { ...action.payload, id: Date.now() };
      state.push(newTask);
    },

    toggleTaskComplete: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      
      if (task) {
        task.completed = !task.completed;
      }
    },

    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },

    editTask: (state, action) => {
      const { id, text, description, dueDate } = action.payload;
      const task = state.find((task) => task.id === id);

      if (task) {
        task.text = text;
        task.description = description;
        task.dueDate = dueDate ? dayjs(dueDate).format("YYYY-MM-DD") : null;
      }
    },
  },
});

export const { addTask, toggleTaskComplete, removeTask, editTask } = taskSlice.actions;

export default taskSlice.reducer;
