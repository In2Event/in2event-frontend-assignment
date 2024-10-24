import { UsersTable } from "./users-table";
import SearchInput from "@/components/ui/SearchInput";

export default function UsersPage() {
  return (
    <div className="container p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
      </div>
      <SearchInput />
      <UsersTable />
    </div>
  );
}
