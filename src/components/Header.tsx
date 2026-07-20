import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/ThemeProvider";

import { Button } from "./ui/button";

export default function Header() {
  const { theme, handleThemeChange, logo } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm h-16 flex items-center">
      <div className="container flex items-center justify-between mx-auto px-4 lg:px-8">
        <Link to="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={logo} alt="Polypous Logo's" className="w-9 h-9" />
            <h1 className="text-xl font-bold">Polypous</h1>
          </div>
        </Link>

        <div className="flex items-center gap-5">
          <Button
            variant="ghost"
            onClick={() =>
              handleThemeChange(theme === "light" ? "dark" : "light")
            }
          >
            {theme === "light" ? (
              <Sun className="w-4 h-4 cursor-pointer" />
            ) : (
              <Moon className="w-4 h-4 cursor-pointer" />
            )}
          </Button>

          <Button className="py-4 px-4" asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
