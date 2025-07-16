import { useEffect, useState } from "react";

const API_ENDPOINT = "https://dummyjson.com/users";

const ORDER_DIRECTION = ["desc" , "asc"]

export function useUsers(page = 1, inpage = 10 ) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("yes")
    setLoading(true)
    fetch(API_ENDPOINT + `?limit=${inpage}&skip=${(page-1)*inpage}` )
      .then((res) => res.json())
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [page, inpage ]);
  return [users , loading , error ]
}
