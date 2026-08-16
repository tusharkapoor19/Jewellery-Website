import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// ====================================================
// TYPES
// ====================================================

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = "hiranya-theme";

const ThemeContext = createContext<ThemeContextType | null>(null);

// ====================================================
// HELPERS
// ====================================================

const getInitialTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // localStorage unavailable (private mode, etc.) — fall back to light
  }

  return "light";
};

const applyThemeToDocument = (theme: Theme) => {
  document.body.classList.remove("light", "dark-mode");
  document.body.classList.add(theme === "dark" ? "dark-mode" : "light");
  document.documentElement.setAttribute("data-theme", theme);
};

// ====================================================
// PROVIDER
// ====================================================

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyThemeToDocument(theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage failures
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ====================================================
// HOOK
// ====================================================

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
