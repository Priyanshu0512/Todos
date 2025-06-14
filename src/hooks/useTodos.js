import { ListTodo } from "lucide-react";
import { useState, useEffect } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority, category, dueDate) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      category,
      createdaAt: new Date(),
      dueDate,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updates) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const reorderTodos = (activeId, overId) => {
    setTodos((prev) => {
      const oldIndex = prev.findIndex((todo) => todo.id === activeId);
      const newIndex = prev.findIndex((todo) => todo.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prev;
      const newTodos = [...prev];
      const [removed] = newTodos.splice(oldIndex, 1);
      newTodos.splice(newIndex, 0, removed);
      return newTodos;
    });
  };

  const exportTodos = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `todos-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const importTodos = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          const importedTodos = JSON.parse(content);

          const validatedTodos = importedTodos.map((todo) => ({
            ...todo,
            id: todo.id || crypto.randomUUID(),
            createdAt: new Date(todo.createdAt),
            dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
          }));

          setTodos(validatedTodos);
          resolve();
        } catch (error) {
          reject(new Error("Invalid JSON file"));
        }
      };
      reader.readAsText(file);
    });
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    reorderTodos,
    exportTodos,
    importTodos,
  };
};
