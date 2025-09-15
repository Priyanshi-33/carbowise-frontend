import * as React from "react";

export function Progress({ value = 0, className, ...props }) {
  return (
    <div className={`w-full h-4 bg-gray-200 rounded ${className}`} {...props}>
      <div
        className="h-4 bg-green-500 rounded"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}
