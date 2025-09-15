import * as React from "react";

export function Alert({ children, variant = "default", className }) {
  const baseClasses = "p-4 rounded border flex items-start gap-2";
  let variantClasses = "";

  if (variant === "warning") variantClasses = "bg-yellow-100 border-yellow-400";
  if (variant === "destructive") variantClasses = "bg-red-100 border-red-400";

  return <div className={`${baseClasses} ${variantClasses} ${className}`}>{children}</div>;
}

export function AlertTitle({ children }) {
  return <strong className="font-semibold">{children}</strong>;
}

export function AlertDescription({ children }) {
  return <p className="text-sm text-gray-700">{children}</p>;
}
