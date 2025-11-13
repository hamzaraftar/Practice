import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="min-w-[333px]">
        <div className="bg-gray-100 min-h-screen flex flex-col items-start p-4">
          <h1 className="text-2xl font-bold text-gray-600">ToDo</h1>
          <div className="mt-4 w-full  bg-white p-4 rounded shadow flex justify-between items-center ">
            <input
              className="outline-none text-lg"
              type="text"
              placeholder="Enter ToDo ..."
            />
            <button className="font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 cursor-pointer py-1 rounded-md">
              Add
            </button>
          </div>
          <div className="mt-4 w-full  bg-white p-4 rounded shadow flex flex-col gap-3 ">
            <div className="flex justify-between items-center">
              <span className="text-lg">Sample Task 1</span>
              <div>
                <button className="mx-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 cursor-pointer py-1 rounded-md">
                  Edit
                </button>
                <button className="font-semibold text-white bg-red-600 hover:bg-red-700 px-3 cursor-pointer py-1 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
