import { useRef, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import "./Table.css";
import TableColumn from "./TableColumn";
import TableDragger from "./TableDragger";

const TABLE_HEAD = [
  {
    title: {
      ru: "Фамилия",
      en: "Last name",
    },
    tag: ["lastName"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      ru: "Имя",
      en: "First name",
    },
    tag: ["firstName"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      ru: "Отчество",
      en: "Middle name",
    },
    tag: ["middleName"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      ru: "Возраст",
      en: "Age",
    },
    tag: ["age"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      ru: "Пол",
      en: "Gender",
    },
    tag: ["gender"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      ru: "Номер Телефона",
      en: "Phone number",
    },
    tag: ["phone"],
    isOrdering: true,
    width: "auto",
  },
  {
    title: {
      ru: "Электронная Почта",
      en: "Email",
    },
    tag: ["email"],
    isOrdering: false,
    width: "auto",
  },
  {
    title: {
      ru: "Страна",
      en: "Country",
    },
    tag: ["address", "country"],
    isOrdering: false,
    width: "auto",
  },
  {
    title: {
      ru: "Город",
      en: "City",
    },
    tag: ["address", "city"],
    isOrdering: false,
    width: "auto",
  },
];


//TODO need to add event listener (resize table)
function getWidthById(id) {
  return document.getElementById(id).clientWidth;
}

export function ResizeColumn(tableInfo, setTableInfo, index, delta) {
  // init check width
  if (tableInfo[0].width === "auto")
    setTableInfo((prev) => {
      return prev.map(
        (item, index) => ({...item,width : getWidthById(`table_column-${index}`)})
      );
    });

  setTableInfo((prev) => {
    let newTableInfo = [...prev];
    if (newTableInfo[index].width + delta < 50) return prev;
    if (newTableInfo[index + 1].width - delta < 50) return prev;
    if (
      newTableInfo.reduce((acc, item) => acc + item.width, 0) >=
      getWidthById("user-table")
    )
      return prev;
    newTableInfo[index].width += delta;
    newTableInfo[index + 1].width -= delta;

    if (newTableInfo[index].width < 50) newTableInfo[index].width = 50;
    if (newTableInfo[index + 1].width < 50) newTableInfo[index].width = 50;

    return newTableInfo;
  });
}

const Table = ({ lang = "ru" }) => {
  const [tableInfo, setTableInfo] = useState(TABLE_HEAD);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const [users, loading, error] = useUsers(1, 10, sortBy, sortOrder);

  return (
    <div id="user-table" className="Users-Table">
      {tableInfo &&
        tableInfo.map((column, index) => (
          <div className="Users-Table-Column-Wrapper" key={index}>
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
              width={column.width}
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
    </div>
  );
};

export default Table;
