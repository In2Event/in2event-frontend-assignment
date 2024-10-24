"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams?.get("query") || ""
  );

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams || "");
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="mb-4 flex items-center w-96 border p-2 rounded-xl  gap-2">
      <Search color="white" size={24} />
      <input
        type="search"
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        className=" w-full bg-black/10 text-sm outline-none"
        placeholder="Search users by name or email"
        value={searchQuery}
      />
    </div>
  );
};

export default SearchInput;
