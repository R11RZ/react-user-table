import { useEffect, useState } from "react";

const API_ENDPOINT = "https://dummyjson.com/users";

const ORDER_DIRECTION = ["desc" , "asc"]

export function useUsers(page = 1, inpage = 10 ,  sortBy , sortOrder) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("yes")
    setLoading(true)
    fetch(API_ENDPOINT + `?limit=${inpage}&skip=${(page-1)*inpage}` + (sortBy && sortOrder ? `&sortBy=${sortBy}&order=${ORDER_DIRECTION[sortOrder-1]}`: "") )
      .then((res) => res.json())
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [page, inpage , sortBy , sortOrder]);
  return [users , loading , error ]
}
