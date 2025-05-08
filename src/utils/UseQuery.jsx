import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async (val) => {
  const res = await axios.get(val);
  return res.data;
};

export default function UseQuery(url) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", url],
    queryFn: () => fetchUsers(url),
  });
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return { data };
}
