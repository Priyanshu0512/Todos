import { useState } from "react";
import { Plus, Tag, Flag, Calendar } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const AddTodoForm = ({ onAdd }) => {
  const { currentTheme } = useTheme();
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  const categories = [
    "General",
    "Work",
    "Personal",
    "Shopping",
    "Health",
    "Learning",
  ];
  const priorities = [
    { value: "low", label: "Low", color: currentTheme.colors.success },
    { value: "medium", label: "Medium", color: currentTheme.colors.warning },
    { value: "high", label: "High", color: currentTheme.colors.error },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const dueDateObj = dueDate ? new Date(dueDate) : undefined;
      onAdd(text.trim(), priority, category, dueDateObj);
      setText("");
      setPriority("medium");
      setCategory("General");
      setDueDate("");
      setIsExpanded(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="Add a new Todo..."
          className="w-full px-6 py-4 pr-14 rounded-2xl border-2 focus:outline-none transition-all duration-300 text-lg placeholder-opacity-60"
          style={{
            backgroundColor: currentTheme.colors.surface,
            borderColor: isExpanded
              ? currentTheme.colors.primary
              : currentTheme.colors.border,
            color: currentTheme.colors.text,
          }}
        />

        <button
          type="submit"
          disabled={!text.trim()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
          style={{
            backgroundColor: currentTheme.colors.primary,
            color: "white",
          }}
        >
          <Plus size={20} />
        </button>
      </div>

      {isExpanded && (
        <div
          className="flex flex-wrap gap-4 p-4 rounded-2xl transition-all duration-300"
          style={{ backgroundColor: currentTheme.colors.background }}
        >
          <div className="flex items-center gap-2">
            <Tag
              size={16}
              style={{ color: currentTheme.colors.textSecondary }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 rounded-lg border focus:outline-none transition-colors duration-200"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text,
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Flag
              size={16}
              style={{
                color: currentTheme.colors.textSecondary,
              }}
            />
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    priority === p.value ? "ring-2" : ""
                  }`}
                  style={{
                    backgroundColor:
                      priority === p.value
                        ? p.color
                        : currentTheme.colors.surface,
                    color:
                      priority === p.value ? "white" : currentTheme.colors.text,
                    border: `1px solid ${
                      priority === p.value
                        ? p.color
                        : currentTheme.colors.border
                    } `,
                    ringColor: p.color,
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar
              size={16}
              style={{
                color: currentTheme.colors.textSecondary,
              }}
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={today}
              className="px-3 py-2 rounded-lg border focus:outline-none transition-colors duration-200"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text,
              }}
            />
          </div>
        </div>
      )}
    </form>
  );
};
