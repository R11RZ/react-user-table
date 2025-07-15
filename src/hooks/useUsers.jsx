import { useEffect, useState } from "react";

const API_ENDPOINT = "";

export function useUsers(page = 1, inpage = 10) {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoad(true)
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoad(false));
  }, [page, inpage]);
}
