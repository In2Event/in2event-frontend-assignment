import { generateId } from "@/lib/utils";
import { User } from "@/schemas/user";
import { useState, useEffect } from "react";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = (newUser: Omit<User, "id">) => {
    const id = generateId(users);
    const user: User = { id, ...newUser };
    setUsers((prevUsers) => [...prevUsers, user]);
  };
  return { users, loading, error, addUser };
};

export { useUsers };
