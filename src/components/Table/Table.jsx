import { useEffect, useRef, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import "./Table.css";
import TableColumn from "./TableColumn";
import TableDragger from "./TableDragger";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import { useLang } from "../../Context/LangContext";

const TABLE_HEAD = [
  {
    title: {
      Ru: "Фамилия",
      En: "Last name",
    },
    tag: ["lastName"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      Ru: "Имя",
      En: "First name",
    },
    tag: ["firstName"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      Ru: "Отчество",
      En: "Middle name",
    },
    tag: ["middleName"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      Ru: "Возраст",
      En: "Age",
    },
    tag: ["age"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      Ru: "Пол",
      En: "Gender",
    },
    tag: ["gender"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      Ru: "Номер Телефона",
      En: "Phone number",
    },
    tag: ["phone"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      Ru: "Электронная Почта",
      En: "Email",
    },
    tag: ["email"],
    isOrdering: false,
    width: "auto",
  },
  {
    title: {
      Ru: "Страна",
      En: "Country",
    },
    tag: ["address", "country"],
    isOrdering: false,
    width: "auto",
  },
  {
    title: {
      Ru: "Город",
      En: "City",
    },
    tag: ["address", "city"],
    isOrdering: false,
    width: "auto",
  },
];

function getWidthById(id) {
  return document.getElementById(id).clientWidth;
}

export function ResizeColumn(tableInfo, setTableInfo, index, delta) {
  // init check width

  if (tableInfo[0].width === "auto")
    setTableInfo((prev) => {
      return prev.map((item, index) => ({
        ...item,
        width: getWidthById(`table_column-${index}`),
      }));
    });
  console.log("asdds");
  setTableInfo((prev) => {
    let newTableInfo = [...prev];
    if (newTableInfo[index].width + delta < 50) return prev;
    if (newTableInfo[index + 1].width - delta < 50) return prev;
    console.log(
      newTableInfo.reduce((acc, item) => acc + item.width, 0),
      getWidthById("user-table")
    );

    console.log("asdds44");
    newTableInfo[index].width += delta;
    newTableInfo[index + 1].width -= delta;

    if (newTableInfo[index].width < 50) newTableInfo[index].width = 50;
    if (newTableInfo[index + 1].width < 50) newTableInfo[index].width = 50;

    return newTableInfo;
  });
}

const Table = () => {
  const {lang} = useLang()
  const [tableInfo, setTableInfo] = useState(TABLE_HEAD);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [skip, setSkip] = useState(0);
  const [inPage, setInPage] = useState(10);
  const [users, loading, error] = useUsers(skip, inPage, sortBy, sortOrder);

  useEffect(() => {
    console.log("geewww");
    const handleResize = () => {
      console.log("gee");
      setTableInfo((prev) => {
        return prev.map((item) => ({
          ...item,
          width: "auto",
        }));
      });
      console.log(tableInfo);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div id="user-table" className="Users-Table">
        {!loading && tableInfo &&
          tableInfo.map((column, index) => (
            <div
              style={{ width: `${column.width}px` }}
              id={`table_column-${index}`}
              className="Users-Table-Column-Wrapper"
              key={index}
            >
              <TableColumn
                key={index}
                data={users.users}
                nameColumn={column.title[lang]}
                keys={column.tag}
                setSortBy={setSortBy}
                setSortOrder={setSortOrder}
                canOrdering={column.isOrdering}
                sortBy={sortBy}
                sortOrder={sortOrder}
                index={index}
              />
              {index !== tableInfo.length - 1 && (
                <TableDragger
                  index={index}
                  tableInfo={tableInfo}
                  setTableInfo={setTableInfo}
                />
              )}
            </div>
          ))}
          {loading && <Loader />}
      </div>
      <Pagination limit={inPage} skip={users.skip} total_users={users.total}  setSkip={setSkip} setInPage={setInPage} />
    </>
  );
};

export default Table;
