import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import logo from "@/assets/img/logo.svg";
import { meQueryOptions } from "@/utils/auth";

import { Button } from "./ui/button";

export default function Header() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery(meQueryOptions);

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm h-16 flex items-center">
      <div className="container flex items-center justify-between mx-auto px-4 lg:px-8">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate({ to: "/" })}
        >
          <img src={logo} alt="Polypous Logo's" className="w-9 h-9" />
          <h1 className="text-xl font-bold">Polypous</h1>
        </div>

        <div className="flex items-center gap-5">
          {!isLoading && !user && (
            <Button
              className="py-4 px-4"
              onClick={() => navigate({ to: "/auth/login" })}
            >
              Login
            </Button>
          )}

          {!isLoading && user && (
            <Button
              variant="outline"
              className="py-4 px-4"
              onClick={() => navigate({ to: "/dashboard" })}
            >
              Dashboard
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
