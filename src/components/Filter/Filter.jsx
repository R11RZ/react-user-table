import { useLang } from "../../Context/LangContext";
import { SearchFilterParams } from "./initFilterInfo";
import "./Filter.css";

const FilterTitle = {
  title:{
    Ru: "Фильтровать на",
    En: "Filter on",
  },
  btn1:{
    Ru: "сервере",
    En: "server",
  },
  btn2:{
    Ru: "клиенте",
    En: "client",
  }
}

const Filter = ({
  searchParams,
  setSearchParams,
  setSearchString,
  searchString,
  typeFilter,
  setTypeFilter,
}) => {
  const { lang } = useLang();

  return (
    <div className="Filter">
      <h4>{FilterTitle.title[lang]}</h4>
      <div className="Filter-Select-Btns">
        <button
          onClick={() => setTypeFilter("api")}
          className={
            typeFilter === "api"
              ? "Filter-Select-Btn-active"
              : "Filter-Select-Btn"
          }
        >
          {FilterTitle.btn1[lang]}
        </button>
        <button
          onClick={() => setTypeFilter("client")}
          className={
            typeFilter === "client"
              ? "Filter-Select-Btn-active"
              : "Filter-Select-Btn"
          }
        >
          {FilterTitle.btn2[lang]}
        </button>
      </div>
      <div className="Filter-Wrapper">
        <select
          onChange={(e) =>
            setSearchParams({
              value: SearchFilterParams[parseInt(e.target.value)],
              id: parseInt(e.target.value),
            })
          }
          value={searchParams.id}
        >
          {SearchFilterParams.map((ele, index) => (
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

export default Filter;
