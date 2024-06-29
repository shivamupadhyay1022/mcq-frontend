import React from "react";

function Checknav() {
  return (
    <div className="font-hind flex flex-col z-50 justify-center ">
      <div className="bg-slate-700 flex items-center justify-between mx-1 px-4 absolute left-1 right-1 border-slate-400 bottom-1 h-12 rounded-t-3xl border-t-2 ">
        <button className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <p>Prev</p>
        </button>
        <button className="flex items-center space-x-4">
          
          <p>Next</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
        <button className="flex flex-col bg-slate-900 rounded-lg  border-slate-400 justify-center absolute bottom-[0.1] left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-2 h-[35px] w-[145px] items-center">
          <p>Check Answer</p>
        </button>
      </div>
    </div>
  );
}

export default Checknav;
