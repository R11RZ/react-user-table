import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import "./Table.css";
import TableColumn from "./TableColumn";

const TABLE_HEAD = [
  {
    title: {
      ru: "Фамилия",
      en: "Last name",
    },
    tag: ["lastName"],
    isOrdering: true,
  },
  {
    title: {
      ru: "Имя",
      en: "First name",
    },
    tag: ["firstName"],
    isOrdering: true,
  },
  {
    title: {
      ru: "Отчество",
      en: "Middle name",
    },
    tag: ["middleName"],
    isOrdering: true,
  },
  {
    title: {
      ru: "Возраст",
      en: "Age",
    },
    tag: ["age"],
    isOrdering: true,
  },
  {
    title: {
      ru: "Пол",
      en: "Gender",
    },
    tag: ["gender"],
    isOrdering: true,
  },
  {
    title: {
      ru: "Номер Телефона",
      en: "Phone number",
    },
    tag: ["phone"],
    isOrdering: true,
  },
  {
    title: {
      ru: "Электронная Почта",
      en: "Email",
    },
    tag: ["email"],
    isOrdering: false,
  },
  {
    title: {
      ru: "Страна",
      en: "Country",
    },
    tag: ["address", "country"],
    isOrdering: false,
  },
  {
    title: {
      ru: "Город",
      en: "City",
    },
    tag: ["address", "city"],
    isOrdering: false,
  },
];

const Table = ({ lang = "ru" }) => {
  //
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const [users, loading, error] = useUsers(1, 10, sortBy, sortOrder);

  console.log(users);
  return (
    <div className="Users-Table">
      {TABLE_HEAD &&
        TABLE_HEAD.map((column, index) => (
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
          />
        ))}
    </div>
  );
};

export default Table;
