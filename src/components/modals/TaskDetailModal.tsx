import React from "react";
import {  TaskDetailModalProps } from "../../types/TaskTypes";
import { CalendarIcon, DocumentTextIcon, ExclamationCircleIcon, TagIcon, XMarkIcon } from "@heroicons/react/24/outline";



const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-5">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-128 max-w-xl h-[32rem] overflow-auto transform transition-all scale-95 hover:scale-100 duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-3xl font-semibold text-gray-800 flex items-center space-x-2">
            <span>Task Details</span>
          </h2>
          <XMarkIcon
            className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={onClose}
          />
        </div>

        {/* Task details */}
        <div className="space-y-4">
          {/* Title */}
          <div className="flex items-center space-x-3">
            <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" />
            <p className="text-lg text-gray-700 font-medium">
              <strong>Title:</strong> {task.title}
            </p>
          </div>

          {/* Description */}
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="w-6 h-6 text-purple-500" />
            <p className="text-lg text-gray-700 font-medium">
              <strong>Description:</strong> {task.description}
            </p>
          </div>

          {/* Due Date */}
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-6 h-6 text-blue-500" />
            <p className="text-lg text-gray-700">
              <strong>Due Date:</strong> {task.dueDate}
            </p>
          </div>

          {/* Tags */}
          <div className="flex items-center space-x-3">
            <TagIcon className="w-6 h-6 text-green-500" />
            <p className="text-lg text-gray-700">
              <strong>Tags:</strong> {task.tags?.join(", ") || "No tags"}
            </p>
          </div>

          {/* Priority */}
          <div className="flex items-center space-x-3">
            <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
            <p className="text-lg text-gray-700">
              <strong>Priority:</strong> {task.priority}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
