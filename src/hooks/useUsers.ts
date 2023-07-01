import { CanceledError } from "../components/services/api-clients";
import React, { useEffect, useState } from "react";
import userService, { Users } from "../components/services/user-service";

const useUsers = () => {
  const [users, setUsers] = useState<Users[]>([]);

  //loader
  const [isLoading, setLoading] = useState(false);

  //error message on request
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<Users>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
