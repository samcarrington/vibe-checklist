"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="dark-mode"
        checked={isDark}
        onCheckedChange={toggleTheme}
      />
      <label
        htmlFor="dark-mode"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {isDark ? 'Dark' : 'Light'} Mode
      </label>
    </div>
  );
}