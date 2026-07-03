import { useEffect, useState } from "react";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";

  const storedTheme = localStorage.getItem("theme");

  if (
    storedTheme === "dark" ||
    (storedTheme === null &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark";
  }

  return "light";
};

type Theme = "light" | "dark";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return { theme, handleThemeChange };
}
