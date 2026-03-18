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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              My Tasks
            </h1>
            <p className="text-slate-500 mt-1">Organize your day efficiently.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Register
            </Link>
            <Link
              to="/logout"
              className="px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-xl shadow-sm transition-all"
            >
              Logout
            </Link>
          </div>
        </header>

        {/* Create Todo */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Create New Task
          </h2>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={addTodo}>
            <input
              type="text"
              placeholder="Task Title..."
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-slate-400"
              required
            />
            <input
              type="text"
              placeholder="Details (optional)..."
              value={content.content}
              onChange={(e) => setContent({ ...content, content: e.target.value })}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-slate-400"
            />
            <button 
              type="submit"
              className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all font-medium shadow-md shadow-indigo-200 whitespace-nowrap"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todo.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 border-dashed">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900">No tasks yet</h3>
              <p className="text-slate-500 mt-1">Get started by creating a new task above.</p>
            </div>
          ) : (
            todo.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.content && (
                    <p className="text-slate-600 mt-1">{item.content}</p>
                  )}
                  <div className="flex items-center mt-3 text-xs text-slate-400">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {new Date(item.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>

                <button
                  onClick={() => deleteTodo(item.id)}
                  className="sm:opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all focus:opacity-100 cursor-pointer"
                  aria-label="Delete task"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
