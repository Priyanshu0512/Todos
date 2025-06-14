import { useState, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Check,
  Trash2,
  Edit3,
  GripVertical,
  Calendar,
  Flag,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const { currentTheme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDueDate, setEditDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : ""
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const finalStyle = {
    ...style,
    backgroundColor: currentTheme.colors.surface,
    border: `1px solid ${currentTheme.colors.border}`,
  };

  const handleSave = () => {
    if (editText.trim()) {
      const updates = { text: editText.trim() };
      if (editDueDate) {
        updates.dueDate = new Date(editDueDate);
      } else {
        updates.dueDate = undefined;
      }
      onUpdate(todo.id, updates);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditText(todo.text);
      setEditDueDate(
        todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : ""
      );
      setIsEditing(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return currentTheme.colors.error;
      case "medium":
        return currentTheme.colors.warning;
      case "low":
        return currentTheme.colors.success;
      default:
        return currentTheme.colors.textSecondary;
    }
  };

  const getPriorityIcon = (priority) => (
    <Flag
      size={14}
      fill={getPriorityColor(priority)}
      color={getPriorityColor(priority)}
    />
  );

  const dueDate = useMemo(
    () =>
      todo.dueDate
        ? typeof todo.dueDate === "string"
          ? new Date(todo.dueDate)
          : todo.dueDate
        : null,
    [todo.dueDate]
  );

  const isOverdue = useMemo(
    () => dueDate && !todo.completed && new Date() > dueDate,
    [dueDate, todo.completed]
  );

  const isDueSoon = useMemo(() => {
    if (!dueDate || todo.completed || isOverdue) return false;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dueDate <= tomorrow;
  }, [dueDate, todo.completed, isOverdue]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      ref={setNodeRef}
      style={finalStyle}
      className={`group relative rounded-2xl p-4 transition-all duration-300 hover:shadow-lg ${
        isDragging ? "opacity-50 scale-105" : ""
      } ${todo.completed ? "opacity-75" : ""} ${
        isOverdue
          ? "ring-2 ring-red-200"
          : isDueSoon
          ? "ring-2 ring-yellow-200"
          : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-lg hover:bg-opacity-10"
          style={{ color: currentTheme.colors.textSecondary }}
        >
          <GripVertical size={16} />
        </button>

        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            todo.completed ? "border-transparent" : ""
          }`}
          style={{
            backgroundColor: todo.completed
              ? currentTheme.colors.success
              : "transparent",
            borderColor: todo.completed
              ? currentTheme.colors.success
              : currentTheme.colors.border,
          }}
        >
          {todo.completed && <Check size={14} color="white" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyPress}
                className="w-full px-3 py-2 rounded-lg border-2 focus:outline-none transition-colors duration-200"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.primary,
                  color: currentTheme.colors.text,
                }}
                autoFocus
              />
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                min={today}
                className="px-3 py-2 rounded-lg border focus:outline-none transition-colors duration-200"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text,
                }}
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p
                  className={`font-medium transition-all duration-300 ${
                    todo.completed ? "line-through opacity-60" : ""
                  }`}
                  style={{ color: currentTheme.colors.text }}
                >
                  {todo.text}
                </p>
                {getPriorityIcon(todo.priority)}
                {isOverdue && (
                  <AlertTriangle size={14} color={currentTheme.colors.error} />
                )}
              </div>

              <div className="flex items-center gap-3 text-sm flex-wrap">
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${currentTheme.colors.primary}20`,
                    color: currentTheme.colors.primary,
                  }}
                >
                  {todo.category}
                </span>

                <div
                  className="flex items-center gap-1"
                  style={{ color: currentTheme.colors.textSecondary }}
                >
                  <Calendar size={12} />
                  <span>
                    Created: {new Date(todo.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {dueDate && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      isOverdue
                        ? "bg-red-100 text-red-700"
                        : isDueSoon
                        ? "bg-yellow-100 text-yellow-700"
                        : ""
                    }`}
                    style={{
                      color:
                        isOverdue || isDueSoon
                          ? undefined
                          : currentTheme.colors.textSecondary,
                      backgroundColor:
                        isOverdue || isDueSoon
                          ? undefined
                          : `${currentTheme.colors.accent}20`,
                    }}
                  >
                    <Calendar size={12} />
                    <span>
                      Due: {dueDate.toLocaleDateString()}
                      {isOverdue && " (Overdue)"}
                      {isDueSoon && " (Due Soon)"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            <Edit3 size={16} />
          </button>

          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
            style={{ color: currentTheme.colors.error }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
