"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export const DarkmodeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  return (
    <Button
      size="icon"
      className="p-2 rounded-full bg-gray-800 text-white hover:scale-110 transition-transform"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {isDarkMode ? "🌞" : "🌙"}
    </Button>
  );
};
