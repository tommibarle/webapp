import { useState } from "react";
import supabase from "./supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 p-6 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-4 border rounded"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 border rounded"
          placeholder="Password"
          required
        />
        <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
