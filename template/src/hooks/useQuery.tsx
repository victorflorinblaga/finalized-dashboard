"use client";
import { useEffect, useState } from "react";

export function useQuery(url: string, query: string) {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/query", {
      method: "POST",
      body: JSON.stringify({
        query,
        url
      }),
    })
      .then(async (response) => {
        console.log(response);
        const data = await response.json();
        const keys = data.head.vars;
        const bindings = data.results.bindings;
        const parsed = bindings.map(
          (row: { [key: string]: { value: string } }) => {
            return keys.map((key: string | number) => row[key]?.value);
          }
        );

        setHeaders(keys);
        setRows(parsed);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        return { error };
      });

    return () => {};
  }, []);

  return [headers, rows, loading];
}
