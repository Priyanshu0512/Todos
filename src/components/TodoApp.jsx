import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Filter, Search, Sparkles } from "lucide-react";
import { useTodos } from "../hooks/useTodos";
import { useTheme } from "../hooks/useTheme";
import { ThemeSelector } from "./ThemeSelector";
import { AddTodoForm } from "./AddTodoForm";
import { TodoItem } from "./TodoItem";
import { TodoStats } from "./TodoStats";
import { ProgressBar } from "./ProgressBar";
import { ExportImport } from "./ExportImport";

export const TodoApp = () => {
  const { currentTheme } = useTheme();
  const {
    todos,
    toggleTodo,
    addTodo,
    deleteTodo,
    updateTodo,
    reorderTodos,
    exportTodos,
    importTodos,
  } = useTodos();

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const categories = [
    "all",
    ...Array.from(new Set(todos.map((todo) => todo.category))),
  ];

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed);

    const matchSearch = todo.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || todo.category === selectedCategory;

    return matchesFilter && matchSearch && matchesCategory;
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderTodos(active.id, over.id);
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <div className="relative overflow-hidden z-1 pb-16">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-20`}
        />
        <div className="relative px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-2xl"
                  style={{ backgroundColor: currentTheme.colors.surface }}
                >
                  <Sparkles size={28} color={currentTheme.colors.primary} />
                </div>
                <div>
                  <h1
                    className="text-3xl font-bold"
                    style={{ color: currentTheme.colors.text }}
                  >
                    Todo Mastery
                  </h1>
                  <p style={{ color: currentTheme.colors.textSecondary }}>
                    Organize your life with style
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ExportImport onExport={exportTodos} onImport={importTodos} />
                <ThemeSelector />
              </div>
            </div>
            <ProgressBar todos={todos} />
            <TodoStats todos={todos} />
            <AddTodoForm onAdd={addTodo} />
          </div>
        </div>
      </div>
      <div className="px-6 pb-8 z-0 mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-64">
              <Search
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                style={{ color: currentTheme.colors.textSecondary }}
              />
              <input
                type="text"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none transition-colors duration-200"
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text,
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter
                size={16}
                style={{ color: currentTheme.colors.textSecondary }}
              />
              {["all", "active", "completed"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                    filter === filterType ? "ring-2" : ""
                  }`}
                  style={{
                    backgroundColor:
                      filter === filterType
                        ? currentTheme.colors.primary
                        : currentTheme.colors.surface,
                    color:
                      filter === filterType
                        ? "white"
                        : currentTheme.colors.text,
                    border: `1px solid ${
                      filter === filterType
                        ? currentTheme.colors.primary
                        : currentTheme.colors.border
                    }`,
                    ringColor: currentTheme.colors.primary,
                  }}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-xl border focus:outline-none transition-colors duration-200 "
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text,
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredTodos.map((todo) => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {filteredTodos.length === 0 ? (
                  <div
                    className=" text-center py-12 rounded-2xl"
                    style={{
                      backgroundColor: currentTheme.colors.surface,
                      border: `1px solid ${currentTheme.colors.border}`,
                    }}
                  >
                    <div className="mb-4">
                      <div
                        className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${currentTheme.colors.primary}20`,
                        }}
                      >
                        <Sparkles
                          size={32}
                          color={currentTheme.colors.primary}
                        />
                      </div>
                    </div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {searchTerm ||
                      filter !== "all" ||
                      selectedCategory !== "all"
                        ? "No todos match your filters"
                        : "No todos yet"}
                    </h3>
                    <p style={{ color: currentTheme.colors.textSecondary }}>
                      {searchTerm ||
                      filter !== "all" ||
                      selectedCategory !== "all"
                        ? "Try adjusting your search or filters"
                        : "Add your first todo to get started!"}{" "}
                    </p>
                  </div>
                ) : (
                  filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onUpdate={updateTodo}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};
