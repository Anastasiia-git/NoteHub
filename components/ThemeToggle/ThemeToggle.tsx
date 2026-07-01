"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import css from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const STORAGE_KEY = "notehub-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = savedTheme ?? (prefersDark ? "dark" : "light");
    const syncButtonState = window.setTimeout(() => {
      setTheme(nextTheme);
    }, 0);

    document.documentElement.dataset.theme = nextTheme;

    return () => window.clearTimeout(syncButtonState);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return (
    <button
      type="button"
      className={css.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      aria-pressed={theme === "dark"}
    >
      <span className={css.thumb} data-theme={theme}>
        {theme === "light" ? (
          <Sun size={18} aria-hidden="true" />
        ) : (
          <Moon size={18} aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
