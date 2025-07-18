import { useEffect, useState } from "react";

const API_ENDPOINT = "https://dummyjson.com/users/";

export function useUser(id) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setUser({})
    fetch(API_ENDPOINT + id)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Http Error ${res.status}`);
        }
        return res.json();
      })
      .then(setUser)
      .catch((e) => {
        setUser({});
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return [user, loading, error];
}
