import { useEffect, useState } from "react";

const API_ENDPOINT = "https://dummyjson.com/users/";


export function useUser(index) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!index) return;
    setLoading(true)
    fetch(API_ENDPOINT + index)
      .then((res) => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [index]);

  return [user , loading , error ]
}

