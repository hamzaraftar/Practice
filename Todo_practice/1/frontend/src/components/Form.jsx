import { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Constant";
import { useNavigate, Link } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

export default function Form({ route, method }) {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, data);
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message,
      );
      alert(error.response?.data?.detail || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-indigo-50 via-white to-slate-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full max-w-md transition-all duration-300"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">
            {name}
          </h1>
          <p className="text-sm text-slate-500">
            {method === "login" ? "Welcome back! Please enter your details." : "Create an account to get started."}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-900"
              type="text"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-900"
              type="text"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-900"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center my-4">
            <LoadingIndicator />
          </div>
        )}

        <button
          className={`w-full mt-6 bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ${loading ? "cursor-not-allowed opacity-70" : ""}`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Please wait..." : name}
        </button>

        <div className="mt-6 text-center">
          <span className="text-sm text-slate-500">
            {method === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <Link
              to={method === "login" ? "/register" : "/login"}
              className="text-indigo-600 font-semibold hover:text-indigo-500 hover:underline transition-colors"
            >
              {method === "login" ? "Register" : "Login"}
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
