import { useState, useEffect } from "react";
import { themes } from "../data/themes";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("todo-theme");
    return saved ? themes.find((t) => t.id === saved) || themes[0] : themes[0];
  });

  useEffect(() => {
    localStorage.setItem("todo-theme", currentTheme.id);

    const root = document.documentElement;
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [currentTheme]);

  const changeTheme = (themeId) => {
    const theme = themes.find((t) => t.id === themeId);

    if (theme && theme.id !== currentTheme.id) {
      setCurrentTheme(theme);

      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
  };
  return {
    currentTheme,
    themes,
    changeTheme,
  };
};
