"use client";
import { useState } from "react";
import Panel0 from "./components/panel0";
import Panel1 from "./components/panel1";
import Panel2 from "./components/panel2";
import Panel3 from "./components/panel3";

// # this is branch main2

export default function Dashboard() {
  const [isScrollable, setIsScrollable] = useState(false);

  const toggleScrollable = () => {
    setIsScrollable(!isScrollable);
  };

  return (
    <div className="w-screen h-screen p-4">
      <div className="flex h-[5%] justify-between items-center mb-2 ">
      <h1
        className="pl-4 flex gap-2 items-center text-xl font-bold text-stone-800 tracking-wide font-inter select-none"
      >
        <img src="/logo_dive.svg" alt="Dive Logo" className="w-6" />
        DIVE
      </h1>
        <button
          onClick={toggleScrollable}
          className={`p-2 border-[1px] rounded ${
            isScrollable ? "bg-blue-500 text-white" : "text-black bg-white border-black"
          }`}
        >
          Toggle Scrollable
        </button>
      </div>
      <div className="w-full h-[95%] grid grid-cols-2 grid-rows-2 gap-3">
        <div
          className={`rounded-xl border-2 border-gray-200 ${
            isScrollable ? "overflow-auto" : "overflow-hidden"
          }`}
        >
          <Panel0 />
        </div>
        <div
          className={`rounded-xl border-2 border-gray-200 ${
            isScrollable ? "overflow-auto" : "overflow-hidden"
          }`}
        >
          <Panel1 />
        </div>
        <div
          className={`rounded-xl border-2 border-gray-200 ${
            isScrollable ? "overflow-auto" : "overflow-hidden"
          }`}
        >
          <Panel2 />
        </div>
        <div
          className={`rounded-xl border-2 border-gray-200 ${
            isScrollable ? "overflow-auto" : "overflow-hidden"
          }`}
        >
          <Panel3 />
        </div>
      </div>
    </div>
  );
}
