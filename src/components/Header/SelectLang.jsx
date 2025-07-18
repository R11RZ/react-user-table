import { useLang } from "../../Context/LangContext";
import "./Header.css";

const SupportedLang = ["Ru", "En"];
const SelectLang = () => {
  const { setLang, lang } = useLang();
  return (
    <div className="Select-Wrapper">
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        {SupportedLang.map((ele, index) => (
          <option key={index}>{ele}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectLang;
