import { createSelector } from "@reduxjs/toolkit";
import { TaskState } from "../../../types/TaskTypes";

export const selectAllTags = createSelector(
  (state: { tasks: TaskState }) => state.tasks.tasks,
  (tasks) => {
    const allTags = tasks.flatMap((task) => task.tags);
    return Array.from(new Set(allTags));
  }
);
