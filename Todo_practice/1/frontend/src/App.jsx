import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="">
        <div className="bg-gray-50 min-h-screen flex flex-col items-start p-4 lg:p-7">
          <div className="w-full flex justify-between items-center">
            <h1 className="sm:text-2xl text-xl font-bold text-gray-600 md:text-2xl lg:text-3xl">
              ToDo
            </h1>
            <div>
              <button className="bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 mx-2 sm:font-semibold sm:bg-blue-500  sm:text-white lg:rounded-lg px-2 py-1 lg:p-2 lg:px-6 lg:text-lg lg:font-bold  rounded-sm font-medium cursor-pointer">
                Login
              </button>
              <button className="text-white lg:rounded-lg bg-gray-500 hover:bg-gray-600 transition px-2 cursor-pointer py-1 rounded-sm lg:p-2 lg:px-6 lg:text-lg lg:font-bold">
                Logout
              </button>
            </div>
          </div>
          <div className="mt-6  sm:mt-7   md:mt-9 lg:mt-12  w-full  bg-white p-4 rounded shadow flex justify-between items-center sm:max-w-md mx-auto md:max-w-xl lg:max-w-5xl">
            <input
              className="outline-none text-lg"
              type="text"
              placeholder="Enter ToDo ..."
            />
            <button className=" lg:p-2 lg:px-6 lg:text-lg lg:font-bold font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 cursor-pointer py-1 rounded-sm">
              Add
            </button>
          </div>
          <div className="mt-4 w-full  bg-white p-4 rounded shadow flex flex-col gap-3 sm:max-w-md mx-auto md:max-w-xl lg:max-w-5xl ">
            <div className="flex justify-between items-center">
              <span className="text-lg">Sample Task 1</span>
              <div>
                <button className=" lg:p-2 lg:px-6 lg:text-lg lg:font-bold lg:rounded-lg mx-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 cursor-pointer py-1 rounded-sm">
                  Edit
                </button>
                <button className=" lg:p-2 lg:px-6 lg:text-lg lg:font-bold font-semibold lg:rounded-lg text-white bg-red-600 hover:bg-red-700 px-3 cursor-pointer py-1 rounded-sm">
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
