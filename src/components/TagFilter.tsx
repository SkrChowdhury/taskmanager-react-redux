import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TagIcon } from "@heroicons/react/24/outline";
import { setTagsFilter } from "../store/features/task/taskSlice";
import { TagFilterProps } from "../types/TaskTypes";

const TagFilter: React.FC<TagFilterProps> = ({ uniqueTags }) => {
  const dispatch = useDispatch();
  const selectedTags = useSelector((state: any) => state.tasks.selectedTags);
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [tagSearchResults, setTagSearchResults] =
    useState<string[]>(uniqueTags);

  const handleTagSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagSearchTerm(value);

    const filteredTags = uniqueTags.filter((tag) =>
      tag.toLowerCase().includes(value.toLowerCase())
    );
    setTagSearchResults(filteredTags);
  };

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      dispatch(setTagsFilter([...selectedTags, tag]));
    }
    setTagSearchTerm("");
  };

  const handleTagRemove = (tag: string) => {
    dispatch(setTagsFilter(selectedTags.filter((t: any) => t !== tag)));
  };

  return (
    <div className="w-full sm:w-auto mt-2">
      <label className="text-md font-medium text-gray-700 flex items-center">
        <TagIcon className="h-5 w-5 text-gray-500 mr-1" />
        Filter by Tag
      </label>

      <div className="relative">
        <input
          type="text"
          placeholder="Search and add tags..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={tagSearchTerm}
          onChange={handleTagSearchChange}
        />
        {tagSearchTerm && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
            {tagSearchResults.map((tag) => (
              <div
                key={tag}
                className="cursor-pointer px-4 py-2 hover:bg-indigo-100"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {selectedTags.map((tag: any) => (
          <div
            key={tag}
            className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm shadow-sm"
          >
            <span>{tag}</span>
            <button
              onClick={() => handleTagRemove(tag)}
              className="ml-2 text-indigo-600"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
