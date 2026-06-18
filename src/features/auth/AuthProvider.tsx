import { createContext, useContext, useEffect, useState } from "react";

import ProtectedRoutePending from "@/components/routing/ProtectedRoutePending";

import useCheckAuth from "./hooks/use-check-auth";
import useLogin from "./hooks/use-login";
import useLogout from "./hooks/use-logout";
import useRegister from "./hooks/use-register";
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
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const { currentUser, isCheckingAuth } = useCheckAuth();
  const { login: loginUser, isLoggingIn } = useLogin();
  const { registerUser, isRegistering } = useRegister();
  const { logout: logoutUser, isLoggingOut } = useLogout();

  const isAuthenticated = !!user;

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  if (isCheckingAuth) return <ProtectedRoutePending />;

  const login = async (email: string, password: string) => {
    const response = await loginUser({ email, password });
    if (response) {
      setUser(response);
    }
  };

  const register = async (payload: RegisterPayload) => {
    await registerUser(payload);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
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
