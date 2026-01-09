import {
  getLocalStorage,
  removeLocalStorage,
  saveLocalStorage,
} from "@/lib/storage";
import clientAPI from "@/services/api";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  async function login(email, password) {
    setLoading(true);
    try {
      const response = await clientAPI.post("/auth/login", { email, password });
      const { token: _token, user: _user } = response.data;
      saveLocalStorage(_token, _user);
      setUser(_user);
      setToken(_token);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  }
  async function register(username, email, password) {
    setLoading(true);
    try {
      const response = await clientAPI.post("/auth/register", {
        username,
        email,
        password,
      });
      const { token: _token, user: _user } = response.data;
      saveLocalStorage(_token, _user);
      setUser(_user);
      setToken(_token);
      setIsAuthenticated(true);
    } catch (error) {}
  }

  function logout() {
    removeLocalStorage();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    navigate("/");
  }

  useEffect(() => {
    const { token: _token, user: _user } = getLocalStorage();
    if (!_token || !_user) return;
    setToken(_token);
    setUser(_user);
    setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
