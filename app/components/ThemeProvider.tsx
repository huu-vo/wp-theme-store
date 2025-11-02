"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ht_theme");
    const prefer = saved
      ? saved === "dark"
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefer);
    document.documentElement.classList.toggle("dark", prefer);
    setMounted(true);
  }, []);

  const toggle = () => {
    const v = !dark;
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
    localStorage.setItem("ht_theme", v ? "dark" : "light");
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className="w-8 h-8" />; // Placeholder with same dimensions
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
