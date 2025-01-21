import Panel0 from "./components/panel0";
import Panel1 from "./components/panel1";
import Panel2 from "./components/panel2";
import Panel3 from "./components/panel3";

// # this is branch main2

export default function Dashboard() {
  return (
    <div className="bg-stone-100 w-full h-screen p-4 flex flex-col">
      <div className="p-6 bg-white border border-gray-200 rounded-xl mx-auto w-full max-w-screen-xl flex-1 flex flex-col">
        <h1 className="text-xl font-semibold pb-4">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
          <div className="rounded-xl border-2 border-gray-200 h-full p-4">
            <Panel0 />
          </div>
          <div className="rounded-xl border-2 border-gray-200 h-full p-4">
            <Panel1 />
          </div>
          <div className="rounded-xl border-2 border-gray-200 h-full p-4">
            <Panel2 />
          </div>
          <div className="rounded-xl border-2 border-gray-200 h-full p-4">
            <Panel3 />
          </div>
        </div>
      </div>
    </div>
  );
}
