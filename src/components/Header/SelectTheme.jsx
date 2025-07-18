import { useEffect, useState } from "react";
import "./Header.css";
import DarkTheme from "../../Icons/DarkTheme";
import LightTheme from "../../Icons/LightTheme";

const SelectTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    if (!theme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="Theme-Wrapper">
      <button
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        className="Theme-Button"
      >
        {theme === "dark" && <DarkTheme />}
        {theme === "light" && <LightTheme />}
      </button>
    </div>
  );
};

export default SelectTheme;
