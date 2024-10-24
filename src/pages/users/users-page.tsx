import AddNewUser from "./AddNewUser";
import { UsersTable } from "./users-table";
import SearchInput from "@/components/ui/SearchInput";

export default function UsersPage() {
  return (
    <div className=" p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        <AddNewUser />
      </div>
      <SearchInput />
      <UsersTable />
    </div>
  );
}
