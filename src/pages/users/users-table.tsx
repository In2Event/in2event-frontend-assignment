'use client';

import { MoveDownIcon, MoveUpIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SortableKeys, User } from '@/schemas/user';
import Modal from '@/components/ui/Modal';
import UserDetailsModal from './UserDetails';
import { useAPI } from '@/context/apiContext';
import Pagination from '@/components/ui/Pagination';
import Image from 'next/image';

export const UsersTable = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query')?.toString() || '';
  const [selectedUser, setselectedUser] = useState<User | null>();
  const [userModal, setUserModal] = useState(false);
  const { users, loading, error } = useAPI();

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstPost, indexOfLastUser);

  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

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
  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const sortedData = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortBy as SortableKeys];
    const bValue = b[sortBy as SortableKeys];
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
    }
  });

  return (
    <>
      <Table>
        <TableCaption>
          {query.length && filteredUsers.length < 1
            ? 'No users found'
            : 'A list of users.'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('id')}>
              <div className="flex items-center gap-2">
                ID
                <span className='flex'>
                  <MoveUpIcon
                    size={'1rem'}
                    color={
                      sortBy === 'id' && sortOrder === 'asc' ? 'white' : 'gray'
                    }
                  />
                  <MoveDownIcon  className='-ml-2'
                    size={'1rem'}
                    color={
                      sortBy === 'id' && sortOrder === 'desc' ? 'white' : 'gray'
                    }
                  />
                </span>
              </div>
            </TableHead>
            <TableHead
              onClick={() => handleSort('name')}
              className="flex gap-2 items-center "
            >
              Name
              <span className="flex ">
                <MoveUpIcon
                  size={'1rem'}
                  color={
                    sortBy === 'name' && sortOrder === 'asc' ? 'white' : 'gray'
                  }
                />
                <MoveDownIcon  className='-ml-2'
                  size={'1rem'}
                  color={
                    sortBy === 'name' && sortOrder === 'desc' ? 'white' : 'gray'
                  }
                />
              </span>
            </TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((user) => (
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
      <Pagination
        setUsersPerPage={setUsersPerPage}
        usersPerPage={usersPerPage}
        totalPosts={users.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {userModal ? (
        <Modal title="User Information" onClose={() => setUserModal(false)}>
          <UserDetailsModal user={selectedUser} />
        </Modal>
      ) : null}
    </>
  );
};
