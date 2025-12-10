import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });

  const navigate = useNavigate();

  const isAuthenticated = !!accessToken;

  const login = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

