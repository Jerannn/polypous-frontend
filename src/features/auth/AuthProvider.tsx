import { createContext, useContext } from "react";

import ProtectedRoutePending from "@/components/routing/ProtectedRoutePending";
import RouteError from "@/components/routing/RouteError";
import { queryClient } from "@/lib/queryClient";

import useCheckAuth from "./hooks/use-check-auth";
import useLogin from "./hooks/use-login";
import useLogout from "./hooks/use-logout";
import useRegister from "./hooks/use-register";
import { authKeys } from "./queryKeys";
import type { RegisterPayload, User } from "./types";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;

  // loading state
  isLoggingIn: boolean;
  isRegistering: boolean;
  isLoggingOut: boolean;

  // actions
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { currentUser, isCheckingAuth, isError, error } = useCheckAuth();
  const { login: loginUser, isLoggingIn } = useLogin();
  const { registerUser, isRegistering } = useRegister();
  const { logout: logoutUser, isLoggingOut } = useLogout();

  const isAuthenticated = !!currentUser;

  if (isCheckingAuth) return <ProtectedRoutePending />;
  if (isError && error) {
    return (
      <RouteError
        error={error}
        reset={() => queryClient.invalidateQueries({ queryKey: authKeys.me() })}
      />
    );
  }

  const login = async (email: string, password: string) => {
    await loginUser({ email, password });
  };

  const register = async (payload: RegisterPayload) => {
    await registerUser(payload);
  };

  const logout = async (): Promise<boolean> => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Error logging out:", error);
    }

    return true;
  };

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
