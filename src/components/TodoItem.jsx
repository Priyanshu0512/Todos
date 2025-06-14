import { useEffect, useState } from "react";
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
    todo.dueDate ? todo.dueDate.toISOString().split("T")[0] : ""
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
        todo.dueDate ? todo.dueDate.toISOString().split("T")[0] : ""
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

  const getPriorityIcon = (priority) => {
    return (
      <Flag
        size={14}
        fill={getPriorityColor(priority)}
        color={getPriorityColor(priority)}
      />
    );
  };

  const isOverDue =
    todo.dueDate && !todo.completed && new Date() > todo.dueDate;
  const isDueSoon =
    todo.dueDate &&
    !todo.completed &&
    !isOverDue &&
    new Date(todo.dueDate.getTime() - 24 * 60 * 60 * 1000) <= new Date();

  const today = new Date().toISOString().split("T")[0];
};
