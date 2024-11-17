import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
      <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-400"></div>
    </div>
  );
};

export default Loader;
