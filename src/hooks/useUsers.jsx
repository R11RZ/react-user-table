import { useEffect, useState } from "react";

const API_ENDPOINT = "https://dummyjson.com/users";

const ORDER_DIRECTION = ["desc" , "asc"]

export function useUsers(skip = 0, inpage = 10 ,  sortBy , sortOrder) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)
    fetch(API_ENDPOINT + `?limit=${inpage}&skip=${skip}` + (sortBy && sortOrder ? `&sortBy=${sortBy}&order=${ORDER_DIRECTION[sortOrder-1]}`: "") )
      .then((res) => res.json())
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [skip, inpage , sortBy , sortOrder]);

  return [users , loading , error ]
}

