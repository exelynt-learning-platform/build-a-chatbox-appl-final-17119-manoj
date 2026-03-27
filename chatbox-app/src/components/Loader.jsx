import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center my-6">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-3"></div>
      {/* Loading text */}
      <p className="text-gray-600 text-lg">Loading...</p>
    </div>
  );
};

export default Loader;