import { useState } from "react";
import CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";

function Bar({ setSearchTerm }) {
  return (
    <div className="bg-gray-950 mx-12 my-3 flex items-center">
      <div className="relative w-100">
        <input
          type="text"
          placeholder="Search Items..."
          className="w-full h-10 ps-3 pe-10 border border-orange-400 bg-transparent text-white rounded"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <CIcon
          icon={cilSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
        />
      </div>
    </div>
  );
}

export default Bar;