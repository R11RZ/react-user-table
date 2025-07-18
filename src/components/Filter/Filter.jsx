import { useLang } from "../../Context/LangContext";
import { SearchFilterParams } from "./initFilterInfo";
import "./Filter.css";
import { useState } from "react";

const FilterTitle = {
  title: {
    Ru: "Фильтровать на",
    En: "Filter on",
  },
  btn1: {
    Ru: "сервере",
    En: "server",
  },
  btn2: {
    Ru: "клиенте",
    En: "client",
  },
};

const Filter = ({
  searchParams,
  setSearchParams,
  setSearchString,
  searchString,
  typeFilter,
  setTypeFilter,
}) => {
  const { lang } = useLang();

  //needed so that unnecessary rerenders are not called
  const [localTypeFilter, setLocalTypeFilter] = useState(typeFilter);

  return (
    <div className="Filter">
      <h4>{FilterTitle.title[lang]}</h4>
      <div className="Filter-Select-Btns">
        <button
          onClick={() => setLocalTypeFilter("api")}
          className={
            localTypeFilter === "api"
              ? "Filter-Select-Btn-active"
              : "Filter-Select-Btn"
          }
        >
          {FilterTitle.btn1[lang]}
        </button>
        <button
          onClick={() => setLocalTypeFilter("client")}
          className={
            localTypeFilter === "client"
              ? "Filter-Select-Btn-active"
              : "Filter-Select-Btn"
          }
        >
          {FilterTitle.btn2[lang]}
        </button>
      </div>
      <div className="Filter-Wrapper">
        <select
          onChange={(e) => {
            setTypeFilter(localTypeFilter);
            setSearchParams({
              value: SearchFilterParams[parseInt(e.target.value)],
              id: parseInt(e.target.value),
            });
          }}
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
          onInput={(e) => {
            setTypeFilter(localTypeFilter);
            setSearchString(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Filter;
