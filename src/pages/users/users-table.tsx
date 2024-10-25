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
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { User } from "@/schemas/user";
import Modal from "@/components/ui/Modal";
import UserDetailsModal from "./UserDetails";
import { useAPI } from "@/context/apiContext";
import Pagination from "@/components/ui/Pagination";
import Image from "next/image";

export const UsersTable = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query")?.toString() || "";
  const [selectedUser, setselectedUser] = useState<User | null>();
  const [userModal, setUserModal] = useState(false);
  const { users, loading, error } = useAPI();

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstPost, indexOfLastUser);

 
  const filteredUsers = currentUsers.filter(
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
              <TableCell className="flex gap-2 items-center">
                <Image
                  src="/image/pic.jpg"
                  alt=""
                  width={32}
                  height={32}
                  className=" rounded-full"
                />
                {user.name}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination setUsersPerPage={setUsersPerPage}
        usersPerPage={usersPerPage}
        totalPosts={users.length}
        currentPage={currentPage} setCurrentPage={setCurrentPage}
      />
      {userModal ? (
        <Modal title="User Information" onClose={() => setUserModal(false)}>
          <UserDetailsModal user={selectedUser} />
        </Modal>
      ) : null}
    </>
  );
};
