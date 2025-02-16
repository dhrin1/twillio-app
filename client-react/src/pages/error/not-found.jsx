import React from "react";

export default function NotFound() {
  return (
    <div className="size-full flex justify-center items-center p-5">
      <div className="flex flex-col">
        <h2 className="font-semibold text-3xl">Page not found</h2>
        <p className="text-gray-500">
          The page your looking for is not exists.
        </p>
      </div>
    </div>
  );
}
