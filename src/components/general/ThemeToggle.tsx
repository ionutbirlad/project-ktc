"use client";
import { useTheme } from "@/styles/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="px-3 py-1 border rounded cursor-pointer">
      {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
