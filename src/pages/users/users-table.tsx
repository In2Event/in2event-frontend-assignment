"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/services/use-users";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { User } from "@/schemas/user";

export const UsersTable = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query")?.toString() || "";
  const { users, loading, error } = useUsers();
  const [selectedUser, setselectedUser] = useState<User | null>();
  const [userModal, setUserModal] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Table>
        <TableCaption>
          {query.length && filteredUsers.length < 1
            ? "No users found"
            : "A list of users."}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => {
                setselectedUser(user);
                setUserModal(true);
              }}
            >
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
