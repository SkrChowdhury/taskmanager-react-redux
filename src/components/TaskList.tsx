import React, { useState } from "react";
import TaskDetailModal from "./modals/TaskDetailModal";
import { Task, TaskListProps } from "../types/TaskTypes";
import { PencilIcon, TrashIcon, CalendarIcon, TagIcon } from "@heroicons/react/24/outline";

const TaskList: React.FC<TaskListProps> = ({ onEdit, onDelete, filteredTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="px-4">
      {filteredTasks.length === 0 ? (
        <div className="text-center text-xl text-gray-600 mt-[25vh]" >No tasks found</div>
      ) : (
        <ul className="space-y-6">
          {filteredTasks.map((task: Task) => (
            <li
              key={task.id}
              className="relative bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center transition transform hover:scale-105 hover:shadow-2xl"
              onClick={() => openModal(task)}
            >
              {/* Priority Indicator */}
              <span
                className={`absolute top-4 right-4 font-semibold text-sm rounded-full px-3 py-1 ${
                  task.priority === "Low"
                    ? "bg-green-100 text-green-700"
                    : task.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : task.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {task.priority}
              </span>

              <div className="space-y-3 w-full sm:w-auto">
                {/* Task Title */}
                <h3 className="font-bold text-lg sm:text-2xl text-gray-800 flex items-center">
                  <span>{task.title}</span>
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-sm sm:text-md italic">
                  {task.description}
                </p>

                {/* Due Date */}
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <CalendarIcon className="h-5 w-5 text-blue-500" />
                  <span>{task.dueDate}</span>
                </div>

                {/* Tags */}
                <div className="flex items-center space-x-2 text-gray-600 text-sm">
                  <TagIcon className="h-5 w-5 text-purple-500" />
                  <span>
                    {task.tags?.length > 0 ? task.tags.join(", ") : "No tags"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mt-4 sm:mt-0 w-full sm:w-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                  }}
                  className="flex items-center justify-center bg-yellow-500 text-white w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 space-x-2"
                >
                  <PencilIcon className="h-5 w-5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                  }}
                  className="flex items-center justify-center bg-red-600 text-white w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 space-x-2"
                >
                  <TrashIcon className="h-5 w-5" />
                  <span>Delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Task Detail Modal */}
      {isModalOpen && selectedTask && (
        <TaskDetailModal task={selectedTask} onClose={closeModal} />
      )}
    </div>
  );
};

export default TaskList;
