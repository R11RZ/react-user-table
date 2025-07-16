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
  },
  {
    title: {
      ru: "Имя",
      en: "First name",
    },
    tag: ["firstName"],
  },
  {
    title: {
      ru: "Отчество",
      en: "Middle name",
    },
    tag: ["middleName"],
  },
  {
    title: {
      ru: "Возраст",
      en: "Age",
    },
    tag: ["age"],
  },
  {
    title: {
      ru: "Возраст",
      en: "Age",
    },
    tag: ["age"],
  },
  {
    title: {
      ru: "Номер Телефона",
      en: "Phone number",
    },
    tag: ["phone"],
  },
  {
    title: {
      ru: "Электронная Почта",
      en: "Email",
    },
    tag: ["email"],
  },
  {
    title: {
      ru: "Страна",
      en: "Country",
    },
    tag: ["address", "country"],
  },
  {
    title: {
      ru: "Город",
      en: "City",
    },
    tag: ["address", "city"],
  },
];

const Table = ({ lang = "ru" }) => {
  
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const [users, loading, error] = useUsers(1, 10);

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
          />
        ))}
    </div>
  );
};

export default Table;
