import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import logo from "@/assets/img/logo.svg";
import { meQueryOptions } from "@/features/auth/queries";
import useAuthStore from "@/features/auth/store";
import { syncAuthUser } from "@/features/auth/utils/authSession";

import { Button } from "./ui/button";

export default function Header() {
  const navigate = useNavigate();
  const storeUser = useAuthStore((state) => state.user);

  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery({
    ...meQueryOptions,
    enabled: !storeUser,
  });

  useEffect(() => {
    if (isSuccess && user) {
      syncAuthUser(user);
    }
  }, [isSuccess, user]);

  const isAuthenticated = storeUser ?? user;

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
          {!isLoading && !isAuthenticated && (
            <Button
              className="py-4 px-4"
              onClick={() => navigate({ to: "/auth/login" })}
            >
              Login
            </Button>
          )}

          {!isLoading && isAuthenticated && (
            <Link to="/dashboard">
              <Button variant="outline" className="py-4 px-4">
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
