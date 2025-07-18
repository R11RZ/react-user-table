import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const LangContext = createContext();

export const useLang = () => useContext(LangContext);

export function LangProvider({children}) {
  const [lang, setLang] = useState("Ru");

  useEffect(() => {
    if (!lang) {
      const navigator_lang = navigator.language || "en";
      const target = navigator_lang.startsWith("ru") ? "Ru" : "En";
      localStorage.setItem("lang", target);
      setLang(target);
      return;
    }
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
