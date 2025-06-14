import { Palette } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const ThemeSelector = () => {
  const { currentTheme, themes, changeTheme } = useTheme();

  return (
    <div className="relative group z-10">
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{
          backgroundColor: currentTheme.colors.surface,
          color: currentTheme.colors.text,
          border: `1px solid ${currentTheme.colors.border}`,
        }}
      >
        <Palette size={18} />
        <span className=" font-medium">{currentTheme.name}</span>
      </button>
      <div
        className="absolute top-full left-0 mt-2 w-64 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
        style={{
          backgroundColor: currentTheme.colors.surface,
          border: `1px solid ${currentTheme.colors.border}`,
        }}
      >
        <div className="p-4">
          <h3
            className="font-semibold mb-3"
            style={{ color: currentTheme.colors.text }}
          >
            Choose Theme
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  currentTheme.id === theme.id ? "ring-2" : ""
                }`}
                style={{
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <div
                  className={`w-full h-8 rounded-lg bg-gradient-to-r ${theme.gradient} mb-2`}
                />
                <div className="text-sm font-medium">{theme.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
