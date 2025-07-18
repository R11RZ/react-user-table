import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import "./Table.css";
import TableColumn from "./TableColumn";
import TableDragger from "./TableDragger";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import { useLang } from "../../Context/LangContext";
import Filter from "../Filter/Filter";
import { SearchFilterParams } from "../Filter/initFilterInfo";
import { TABLE_HEAD } from "./initTableInfo";
import { useNotification } from "../../Context/NotificationContext";




const Table = () => {
  const { lang } = useLang();
  const { setErrorNotif } = useNotification();

  const [typeFilter, setTypeFilter] = useState("client"); // client - filter in front && api - filter on api
  const [searchString, setSearchString] = useState("");
  const [searchParams, setSearchParams] = useState({
    value: SearchFilterParams[0],
    id: 0,
  });

  const [tableInfo, setTableInfo] = useState(TABLE_HEAD);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [skip, setSkip] = useState(0);
  const [inPage, setInPage] = useState(10);

  const [users, loading, error] = useUsers(
    skip,
    inPage,
    sortBy,
    sortOrder,
    typeFilter,
    searchString,
    searchParams
  );

    useEffect(() => {
    if (error) {
      setErrorNotif(error);
      return;
    }
  }, [error]);

  useEffect(() => {
    const handleResize = () => {
      setTableInfo((prev) => {
        return prev.map((item) => ({
          ...item,
          width: "auto",
        }));
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Filter
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setSearchString={setSearchString}
        searchString={searchString}
      />
      <div id="user-table" className="Users-Table">
        {!loading &&
          tableInfo &&
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
      <Pagination
        limit={inPage}
        skip={users.skip}
        total_users={users.total}
        setSkip={setSkip}
        setInPage={setInPage}
      />
    </>
  );
};

export default Table;
