import { useLang } from "../../Context/LangContext";
import { SearchSelectParams } from "./initSearchInfo";
import "./Search.css";
const Search = ({
  searchParams,
  setSearchParams,
  setSearchString,
  searchString,
  typeFilter,
  setTypeFilter,
}) => {
  const { lang } = useLang();

  return (
    <div className="Select">
      <h4>Фильтровать на</h4>
      <div className="Select-Btns">
        <button
          onClick={() => setTypeFilter("api")}
          className={typeFilter === "api" ? "Select-Btn-active" : "Select-Btn"}
        >
          сервере
        </button>
        <button
          onClick={() => setTypeFilter("client")}
          className={
            typeFilter === "client" ? "Select-Btn-active" : "Select-Btn"
          }
        >
          клиенте
        </button>
      </div>
      <div className="Search-Wrapper">
        <select
          onChange={(e) =>
            setSearchParams({
              value: SearchSelectParams[parseInt(e.target.value)],
              id: parseInt(e.target.value),
            })
          }
          value={searchParams.id}
        >
          {SearchSelectParams.map((ele, index) => (
            <option value={index} key={index}>
              {ele.title[lang]}
            </option>
          ))}
        </select>
        <input
        
          value={searchString}
          onInput={(e) => setSearchString(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
