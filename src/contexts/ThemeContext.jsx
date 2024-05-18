import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const changeTheme = (value) => setTheme(value);

  const themeValue = useMemo(() => ({ theme, changeTheme }), [theme]);

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
}

// ThemeContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
