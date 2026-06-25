import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import { createContext, useContext } from "react";

import ProtectedRoutePending from "@/components/routing/ProtectedRoutePending";
import RouteError from "@/components/routing/RouteError";
import { queryClient } from "@/lib/queryClient";

import useCheckAuth from "./hooks/use-check-auth";
import useLogin from "./hooks/use-login";
import useLogout from "./hooks/use-logout";
import useRegister from "./hooks/use-register";
import { authKeys } from "./queryKeys";
import type { LoginPayload, RegisterPayload, User } from "./types";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;

  // loading state
  isLoggingIn: boolean;
  isRegistering: boolean;
  isLoggingOut: boolean;

  // actions
  login: UseMutateAsyncFunction<User, Error, LoginPayload>;
  register: UseMutateAsyncFunction<User, Error, RegisterPayload>;
  logout: UseMutateAsyncFunction<string, Error, void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { currentUser, isCheckingAuth, isError, error } = useCheckAuth();
  const { login, isLoggingIn } = useLogin();
  const { register, isRegistering } = useRegister();
  const { logout, isLoggingOut } = useLogout();

  const isAuthenticated = !!currentUser;

  if (isCheckingAuth) return <ProtectedRoutePending />;
  if (isError && error) {
    console.log(error, "error", isError);
    return (
      <RouteError
        error={error}
        reset={() => queryClient.invalidateQueries({ queryKey: authKeys.me() })}
        showSignIn={!isAuthenticated}
      />
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user: currentUser || null,
        isLoggingIn,
        isRegistering,
        isLoggingOut,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
