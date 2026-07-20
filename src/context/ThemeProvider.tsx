import { createContext, useContext, useEffect, useState } from "react";

import DarkLogo from "@/assets/img/logo/dark-logo.svg";
import LightLogo from "@/assets/img/logo/light-logo.svg";

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

export interface ThemeState {
  theme: Theme;
  logo: string;
  handleThemeChange: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeState | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
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

  const logo = theme === "light" ? LightLogo : DarkLogo;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        handleThemeChange,
        logo,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
}
