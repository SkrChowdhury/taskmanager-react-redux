import React, { useEffect } from "react";
import { z } from "zod";
import { TaskModalProps } from "../../types/TaskTypes";
import {
  CalendarDaysIcon,
  ExclamationCircleIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Zod schema for task form validation
const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"), // Title is mandatory
  description: z.string().min(1, "Description is required"), // Description is mandatory
  dueDate: z.string().min(1, "Due date is required"), // Due date is mandatory
  priority: z.enum(["Low", "Medium", "High"], {
    errorMap: () => ({ message: "Priority is required" }),
  }), // Priority is mandatory
});

const TaskFormModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editTask,
}) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [priority, setPriority] = React.useState("Low");
  const [error, setError] = React.useState<string | null>(null);
  const [tags, setTags] = React.useState<string[]>([]);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setDueDate(editTask.dueDate);
      setPriority(editTask.priority);
      setTags(editTask.tags || []);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Low");
      setTags([]);
    }
  }, [editTask]);

  const handleSave = () => {
    const result = taskFormSchema.safeParse({
      title,
      description,
      dueDate,
      priority,
      tags,
    });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setError(null); // Clear error on success
    onSave({ title, description, dueDate, priority, tags });
    onClose();
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      const newTag = e.currentTarget.value.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 transform transition-all duration-300 ease-in-out animate-fadeIn scale-105">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          {editTask ? "Edit Task" : "Create Task"}
        </h2>

        {/* Title */}
        <div className="flex items-center border-b border-gray-300 mb-4 pb-2">
          <input
            className="w-full border-none p-2 focus:outline-none text-lg text-gray-700"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="flex items-center border-b border-gray-300 mb-4 pb-2">
          <textarea
            className="w-full border-none p-2 focus:outline-none text-gray-700 resize-none"
            placeholder="Task Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Due Date */}
        <div className="flex items-center border-b border-gray-300 mb-4 pb-2">
          <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="date"
            className="w-full border-none focus:outline-none p-2 text-gray-700"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex items-center mb-2 space-x-1">
            <TagIcon className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              className="border-b border-gray-300 focus:border-blue-500 p-2 w-full text-gray-700 placeholder-gray-400 outline-none"
              placeholder="Add a tag and press Enter"
              onKeyDown={handleTagInput}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm shadow"
              >
                {tag}
                <button
                  type="button"
                  className="ml-1 text-blue-400 hover:text-blue-600"
                  onClick={() => removeTag(tag)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div className="flex items-center border-b border-gray-300 mb-4 pb-2">
          <ExclamationCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
          <select
            className="w-full border-none focus:outline-none p-2 text-gray-700"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mb-4 flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 mr-1" />
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition duration-200 shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
          >
            {editTask ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFormModal;
