import { useEffect, useState } from "react";

const API_ENDPOINT = "https://dummyjson.com/users";

const ORDER_DIRECTION = ["desc", "asc"];

function clientFilterUsers(e, searchString, searchParams, setUsers) {
  if (!e) return;
  const filtered = e.users.filter((val) => {
    return val?.[searchParams?.value?.key]
      ?.toLowerCase()
      .includes(searchString.toLowerCase());
  });
  setUsers({
    ...e,
    users: filtered,
  });
}

export function useUsers(
  skip = 0,
  inpage = 10,
  sortBy,
  sortOrder,
  typeFilter,
  searchString,
  searchParams
) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setUsers([]);
    let temp_skip = typeFilter === "client" && searchString ? 0 : skip;
    let temp_limit = typeFilter === "client" && searchString ? 0 : inpage;
    fetch(
      API_ENDPOINT +
        (searchString && typeFilter === "api"
          ? `/filter?key=${searchParams.value.key}&value=${searchString}&`
          : "?") +
        `limit=${temp_limit}&skip=${temp_skip}` +
        (sortBy && sortOrder
          ? `&sortBy=${sortBy}&order=${ORDER_DIRECTION[sortOrder - 1]}`
          : "")
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Http Error ${res.status}`);
        }
        return res.json();
      })
      .then((e) =>
        typeFilter === "client" && searchString
          ? clientFilterUsers(e, searchString, searchParams, setUsers)
          : setUsers(e)
      )
      .catch((e) => {
        setUsers([]);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [skip, inpage, sortBy, sortOrder, typeFilter, searchString, searchParams]);

  return [users, loading, error];
}
