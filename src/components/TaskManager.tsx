import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
import { Task, TaskForm } from "../types/TaskTypes";
import { AppDispatch } from "../store/store";
import TaskList from "./TaskList";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../store/features/task/taskThunks";
import Loader from "./Loader";
import TagFilter from "./TagFilter";
import TaskFormModal from "./modals/TaskFormModal";

const TaskManager: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const loading = useSelector((state: any) => state.tasks.loading);
  const selectedTags = useSelector((state: any) => state.tasks.selectedTags);
  const uniqueTags: string[] = Array.from(
    new Set(tasks.flatMap((task: { tags: string[] }) => task.tags))
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | undefined>(
    undefined
  );
  const [taskSearchTerm, setTaskSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");

  useEffect(() => {
    console.log(uniqueTags, "uniqueTags");
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (newTask: TaskForm) => {
    const taskToAdd: Task = { ...newTask, id: Date.now() };
    dispatch(addTask(taskToAdd));
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setModalOpen(true);
  };

  const handleUpdateTask = (task: TaskForm) => {
    if (taskToEdit) {
      const updatedTask: Task = { ...taskToEdit, ...task };
      dispatch(updateTask(updatedTask));
    }
  };

  const handleDeleteTask = () => {
    if (taskToDelete !== undefined) {
      dispatch(deleteTask(taskToDelete));
      setConfirmDeleteOpen(false);
    }
  };

  const filteredTasks = tasks.filter((task: Task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(taskSearchTerm.toLowerCase());
    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag: string) => task.tags?.includes(tag));

    return matchesSearch && matchesPriority && matchesTags;
  });

  const handleTaskSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskSearchTerm(e.target.value);
  };

  return (
    <div className="px-20 mx-auto p-4 space-y-6 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-2xl mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
          <h1 className="text-3xl font-serif font-bold text-gray-800 flex items-center">
            <ClipboardDocumentCheckIcon className="h-8 w-8 text-indigo-600 mr-2" />
            Task Manager
          </h1>
          <button
            onClick={() => {
              setTaskToEdit(undefined);
              setModalOpen(true);
            }}
            className="flex items-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Task
          </button>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-row w-full sm:w-auto md:w-auto items-center space-y-4 sm:space-y-0 md:space-y-0 sm:space-x-4 md:space-x-4">
          <TagFilter uniqueTags={uniqueTags} />

          <div className="w-full sm:w-auto flex flex-col">
            <label className="text-md font-medium text-gray-700 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-1" />
              Filter by Title
            </label>
            <input
              type="text"
              placeholder="Search tasks..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={taskSearchTerm}
              onChange={handleTaskSearchChange}
            />
          </div>

          <div className="w-full sm:w-auto flex flex-col">
            <label className="text-md font-medium text-gray-700 flex items-center">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500 mr-1" />
              Filter by Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <Loader />
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          filteredTasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={(taskId: number) => {
            setTaskToDelete(taskId);
            setConfirmDeleteOpen(true);
          }}
        />
      )}

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={taskToEdit ? handleUpdateTask : handleAddTask}
        editTask={taskToEdit}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
};

export default TaskManager;
