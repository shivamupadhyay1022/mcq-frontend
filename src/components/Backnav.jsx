import React from "react";
import { useNavigate } from "react-router-dom";

function Backnav() {
  const navigate = useNavigate()
  return (
    <div className="font-hind flex flex-col z-50 justify-center ">
      <div className="bg-slate-700 flex items-center justify- px-4 absolute left-1 right-1 border-slate-400 top-1 h-12 rounded-b-3xl border-b-2 ">
        <div className="items-center w-full justify-between flex ">
          <div className="flex items-center flex-row space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              onClick={() => navigate(-1)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p>Path</p>
          </div>
          <div>start timer</div>
        </div>
      </div>
    </div>
  );
}

export default Backnav;
