import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { decodeJwtPayload, login as loginRequest } from "../api/auth";
const TOKEN_STORAGE_KEY = "token";
const NAME_STORAGE_KEY = "userName";
const ROLE_STORAGE_KEY = "role";

interface AuthContextValue {
  token: string | null;
  name: string | null;
  role: string | null;
  id: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY)
  );
  const [name, setName] = useState<string | null>(() =>
    localStorage.getItem(NAME_STORAGE_KEY)
  );
  const [role, setRole] = useState<string | null>(() =>
    localStorage.getItem(ROLE_STORAGE_KEY)
  );
  const [id, setId] = useState<string | null>(() => {
    const existingToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!existingToken) return null;
    return decodeJwtPayload(existingToken)?.id || null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const data = await loginRequest(email, password);

    const payload = decodeJwtPayload(data.token);
    const userRole = payload?.role || "customer";
    const userId = payload?.id || null;

    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    localStorage.setItem(NAME_STORAGE_KEY, data.name || "");
    localStorage.setItem(ROLE_STORAGE_KEY, userRole);

    // Keep the storefront Navbar (which reads a separate legacy key set)
    // in sync, so a customer logging in here also shows as logged-in there.
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.name || "");
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("auth-change"));

    setToken(data.token);
    setName(data.name || "");
    setRole(userRole);
    setId(userId);

    return userRole;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(NAME_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("auth-change"));
    setToken(null);
    setName(null);
    setRole(null);
    setId(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      name,
      role,
      id,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, name, role, id, login, logout]
  );

  return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};