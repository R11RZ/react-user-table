import SelectLang from "./SelectLang";
import SelectTheme from "./SelectTheme";
import "./Header.css";
import { useLang } from "../../Context/LangContext";

const Title = {
  Ru: "Пользователи",
  En: "Users",
};
const Header = () => {
  const { lang } = useLang();
  return (
    <div className="Header">
      <SelectLang className="Header-ele" />
      <h1 className="Header-ele">{Title[lang]}</h1>
      <SelectTheme className="Header-ele" />
    </div>
  );
};

export default Header;
