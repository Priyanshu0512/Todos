import React from "react";
import { useTheme } from "../hooks/useTheme";

export const ProgressBar = ({ todos }) => {
  const { currentTheme } = useTheme();

  const completed = todos.filter((todo) => todo.completed).length;
  const total = todos.length;
  const percentage = total > 0 ? Math.round(completed / total) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-sm font-medium"
          style={{ color: currentTheme.colors.text }}
        >
          Overall Progress
        </span>
        <span
          className=" text-sm font-bold"
          style={{ color: currentTheme.colors.primary }}
        >
          {percentage}%
        </span>
      </div>

      <div
        className="w-full h-3 rounded-full overflow-hidden"
        style={{ backgroundColor: currentTheme.colors.border }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{
            width: `${percentage}%`,
            backgroundColor: currentTheme.colors.primary,
          }}
        >
          {/* shine effect */}

          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"
            style={{ animation: percentage > 0 ? "shine 2s infinite" : "none" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 text-xs">
        <span style={{ color: currentTheme.colors.textSecondary }}>
          {completed} of {total} completed
        </span>
        {total > 0 && (
          <span style={{ color: currentTheme.colors.textSecondary }}>
            {total - completed} remaining
          </span>
        )}
      </div>
    </div>
  );
};
