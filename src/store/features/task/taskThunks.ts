import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Task } from "../../../types/TaskTypes";
import { API_URL } from "../../../utils/environment";

export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return await response.json();
  } catch (error) {
    toast.error((error as Error).message);
    return rejectWithValue((error as Error).message);
  }
});

export const addTask = createAsyncThunk<Task, Task, { rejectValue: string }>(
  "tasks/addTask",
  async (newTask, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to Create task");
      const result = await response.json();
      toast.success("Task Created Successfully");
      return result;
    } catch (error) {
      toast.error((error as Error).message);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateTask = createAsyncThunk<Task, Task, { rejectValue: string }>(
  "tasks/updateTask",
  async (updatedTask, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${updatedTask.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTask),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update task");
      const result = await response.json();
      toast.success("Task updated successfully");
      return result;
    } catch (error) {
      toast.error((error as Error).message);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteTask = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("tasks/deleteTask", async (taskId, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
    toast.success("Task deleted successfully");
    return taskId;
  } catch (error) {
    toast.error((error as Error).message);
    return rejectWithValue((error as Error).message);
  }
});
