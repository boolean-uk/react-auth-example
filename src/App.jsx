import { AppShell } from "@mantine/core";
import Header from "./components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { createContext, useState } from "react";
import LogoutPage from "./components/LogoutPage";
import HomePage from "./components/HomePage";

export const AuthContext = createContext();

const loadUserDataFromStorage = () => {
  const userVal = localStorage.getItem("authUser");
  if (userVal !== undefined || userVal !== null) return JSON.parse(userVal);
  return null;
};

function App() {
  // load auth token value or if null, set it to ""
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  // load the user from local storage into the state
  const [user, setUser] = useState(loadUserDataFromStorage());

  const navigate = useNavigate();

  // called when we successfully log in
  const login = (user, authToken) => {
    setUser(user);
    setAuthToken(authToken);
    // update local storage
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("authToken", authToken);
    // redirect to home page after login
    navigate("/");
  };

  // called to logout: clear local storage + reset local state
  const logout = () => {
    // reset local user auth state
    setUser(null);
    setAuthToken("");
    // clear local storage
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    // redirect to login page
    navigate("/login");
  };

  return (
    <>
      {/* context to provide auth data including token that can be used in Authorization: Bearer TOKEN headers for other fetch requests */}
      <AuthContext.Provider value={{ user, authToken, login, logout }}>
        <AppShell header={{ height: 60 }} padding="md">
          <Header />

          <AppShell.Main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </AuthContext.Provider>
    </>
  );
}

export default App;
