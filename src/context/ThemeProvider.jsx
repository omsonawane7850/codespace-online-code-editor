import { useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("midnight");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
