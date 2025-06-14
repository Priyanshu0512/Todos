import { CheckCircle, Circle, TrendingUp } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const TodoStats = ({ todos }) => {
  const { currentTheme } = useTheme();
  const completed = todos.filter((todo) => todo.completed).length;
  const total = todos.length;
  const completionRate = total > 0 ? Math.round(completed / total) * 100 : 0;

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: Circle,
      color: currentTheme.colors.primary,
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle,
      color: currentTheme.colors.success,
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: currentTheme.colors.accent,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stats, index) => (
        <div
          key={index}
          className="p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            backgroundColor: currentTheme.colors.surface,
            border: `1px solid ${currentTheme.colors.border}`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                {stats.label}
              </p>
              <p
                className="text-2xl font-bold mt-1"
                style={{ color: currentTheme.colors.text }}
              >
                {stats.value}
              </p>
            </div>
            <div
              className="p-3 rounded-xl"
              style={{ backgroundColor: `${stats.color}20` }}
            >
              <icon size={24} color={stats.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
