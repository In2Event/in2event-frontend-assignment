import React from "react";

const UserItem = ({ tag, value }: { tag: string; value?: string }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-x-2 mb-2">
      <h4 className="font-semibold text-gray-500">{tag}:</h4>
      <p>{value || "---"}</p>
    </div>
  );
};

export default UserItem;
