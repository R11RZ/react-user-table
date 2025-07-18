import { useEffect, useState } from "react";
import "./Header.css";
import DarkTheme from "../../Icons/DarkTheme";
import LightTheme from "../../Icons/LightTheme";

const InitTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const SelectTheme = () => {
  const [theme, setTheme] = useState(InitTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
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
