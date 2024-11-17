import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskState } from "../../../types/TaskTypes";
import { addTask, deleteTask, fetchTasks, updateTask } from "./taskThunks";

// Initial state for tasks
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTags: [],
};

// Task slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTagsFilter: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.payload || "Failed to Create task";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload || "Failed to update task";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete task";
      });
  },
});

export const { setTagsFilter } = taskSlice.actions;
export default taskSlice.reducer;
