"use client";
import React, { useContext, useState, useEffect, createContext } from "react";
import { User } from "@/schemas/user";

const APIContext = createContext<
  | {
      users: User[];
      setUsers: React.Dispatch<React.SetStateAction<User[]>>;
      loading: boolean;
      error: string | null;
    }
  | undefined
>(undefined);

export function APIContextProvider({ children }: { children: any }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <APIContext.Provider
      value={{
        users,
        setUsers,
        loading,
        error,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
