import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  decodeJwtPayload,
  login as loginRequest,
  googleLogin as googleLoginRequest,
} from "../api/auth";

const TOKEN_STORAGE_KEY = "token";
const NAME_STORAGE_KEY = "userName";
const ROLE_STORAGE_KEY = "role";
const PROVIDER_STORAGE_KEY = "authProvider";

interface AuthContextValue {
  token: string | null;
  name: string | null;
  role: string | null;
  id: string | null;
  authProvider: "local" | "google" | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<string>;
  googleLogin: (credential: string) => Promise<string>;

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

  const [authProvider, setAuthProvider] = useState<
    "local" | "google" | null
  >(() => {
    const provider = localStorage.getItem(PROVIDER_STORAGE_KEY);

    if (provider === "google" || provider === "local") {
      return provider;
    }

    return null;
  });

  const [id, setId] = useState<string | null>(() => {
    const existingToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!existingToken) return null;

    return decodeJwtPayload(existingToken)?.id || null;
  });

  // =====================================================
  // RE-SYNC STATE ON auth-change / expiry
  // =====================================================
  // `login`/`logout`/api/client.ts's 401 handler all write directly to
  // localStorage and fire "auth-change", but until now nothing here was
  // listening: React state (token/role/id/isAuthenticated) stayed stale,
  // so e.g. the admin dashboard kept rendering as "logged in" after the
  // token expired or was cleared, while every API call 401'd underneath.
  const syncFromStorage = useCallback(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const payload = storedToken ? decodeJwtPayload(storedToken) : null;

    // A token whose own `exp` claim has already passed is treated as gone,
    // even if something forgot to remove it from localStorage.
    const isExpired = payload?.exp ? payload.exp * 1000 < Date.now() : false;
    const validToken = storedToken && !isExpired ? storedToken : null;

    if (!validToken && storedToken) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(NAME_STORAGE_KEY);
      localStorage.removeItem(ROLE_STORAGE_KEY);
      localStorage.removeItem("isLoggedIn");
    }

    setToken(validToken);
    setName(validToken ? localStorage.getItem(NAME_STORAGE_KEY) : null);
    setRole(validToken ? localStorage.getItem(ROLE_STORAGE_KEY) : null);
    setId(validToken ? payload?.id || null : null);
  }, []);

  useEffect(() => {
    // Catch a token that already expired before this tab even loaded.
    syncFromStorage();

    window.addEventListener("auth-change", syncFromStorage);
    // Keeps multiple tabs in sync if login/logout happens in another tab.
    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.removeEventListener("auth-change", syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, [syncFromStorage]);

  // =====================================================
  // SAVE LOGIN DATA
  // =====================================================

  const saveLoginData = useCallback(
    (
      data: { token: string; name: string },
      provider: "local" | "google"
    ) => {
      const payload = decodeJwtPayload(data.token);

      const userRole = payload?.role || "customer";
      const userId = payload?.id || null;

      // Main auth storage
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(NAME_STORAGE_KEY, data.name || "");
      localStorage.setItem(ROLE_STORAGE_KEY, userRole);

      // Store authentication provider
      localStorage.setItem(PROVIDER_STORAGE_KEY, provider);

      // Storefront legacy keys
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name || "");
      localStorage.setItem("isLoggedIn", "true");

      // Notify other components
      window.dispatchEvent(new Event("auth-change"));

      // React state
      setToken(data.token);
      setName(data.name || "");
      setRole(userRole);
      setId(userId);
      setAuthProvider(provider);

      return userRole;
    },
    []
  );

  // =====================================================
  // NORMAL EMAIL/PASSWORD LOGIN
  // =====================================================

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await loginRequest(email, password);

      return saveLoginData(data, "local");
    },
    [saveLoginData]
  );

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const googleLogin = useCallback(
    async (credential: string) => {
      const data = await googleLoginRequest(credential);

      return saveLoginData(data, "google");
    },
    [saveLoginData]
  );

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(NAME_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
    localStorage.removeItem(PROVIDER_STORAGE_KEY);

    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");

    window.dispatchEvent(new Event("auth-change"));

    setToken(null);
    setName(null);
    setRole(null);
    setId(null);
    setAuthProvider(null);
  }, []);

  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const value = useMemo(
    () => ({
      token,
      name,
      role,
      id,
      authProvider,
      isAuthenticated: Boolean(token),
      login,
      googleLogin,
      logout,
    }),
    [
      token,
      name,
      role,
      id,
      authProvider,
      login,
      googleLogin,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// =====================================================
// useAuth
// =====================================================

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
};