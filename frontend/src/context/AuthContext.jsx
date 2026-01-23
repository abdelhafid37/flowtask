import { getLocalToken, getLocalUser, saveTokenLocaly, saveUserLocaly } from "@/lib/storage";
import clientAPI from "@/services/api";
import { createContext, useEffect, useState } from "react";
import { logout as logoutHelper } from "@/lib/auth";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localToken = getLocalToken();
    const localUser = getLocalUser();
    if (localToken && localUser) {
      setToken(localToken);
      setUser(localUser);
      setIsAuthenticated(true);
    }
  }, []);

  async function login(userEmail, userPassword) {
    setLoading(true);
    try {
      const response = await clientAPI.post("/auth/login", { email: userEmail, password: userPassword });
      const { token: _token, user: _user } = response.data;
      saveTokenLocaly(_token);
      saveUserLocaly(_user);
      setUser(_user);
      setToken(_token);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    logoutHelper();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }

  async function register(userUsername, userEmail, userPassword) {
    setLoading(true);
    try {
      const response = await clientAPI.post("/auth/register", {
        username: userUsername,
        email: userEmail,
        password: userPassword,
      });
      const { token: _token, user: _user } = response.data;
      saveTokenLocaly(_token);
      saveUserLocaly(_user);
      setUser(_user);
      setToken(_token);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
