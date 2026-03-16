import { useState, useEffect } from "react";
import api from "../api";
import {Link} from "react-router-dom";

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [content, setContent] = useState({ title: "", content: "" });

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    try {
      const res = await api.get("/api/todos/");
      setTodo(res.data);
    } catch (error) {
      alert(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await api.delete(`/api/todos/${id}/`);
      setTodo(todo.filter((item) => item.id !== id));
    } catch (error) {
      alert(error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/todos/", content);

      setTodo((prev) => [...prev, res.data]);

      setContent({
        title: "",
        content: "",
      });
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6">
         to <Link to="/logout" className="font-bold text-blue-500 hover:underline" >Logout  </Link>
          or <Link to="/register" className="font-bold text-blue-500 hover:underline ">   Register</Link>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Todo List
        </h2>

        <div className="space-y-4 mb-8">
          {todo.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl p-4 flex justify-between items-start hover:shadow-md transition"
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-700">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xl">{item.content}</p>
                <p className="text-gray-500 text-sm">
                  Created: {new Date(item.created_at).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => deleteTodo(item.id)}
                className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create Todo
        </h2>

        <form className="space-y-4" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Title"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Content"
            value={content.content}
            onChange={(e) =>
              setContent({ ...content, content: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button className="w-full bg-blue-500 text-white cursor-pointer py-2 rounded-lg hover:bg-blue-600 transition font-semibold">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
}
