import React from "react";

const Skeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Imagen */}
      <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse"></div>
      {/* Título */}
      <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse"></div>
      {/* Texto */}
      <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
      <div className="w-5/6 h-4 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
};
