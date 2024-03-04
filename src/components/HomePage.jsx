import { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to login if not logged in
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return <h1>Welcome, {user ? user.username : "anonymous"}</h1>;
}

export default HomePage;
