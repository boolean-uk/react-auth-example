import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();  

  useEffect(() => {
    // redirect to login if not logged in
    if (!user) {
      navigate("/login");
    } else {
      fetch("http://localhost:4000/books", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": ""
        },
      })
        .then((res) => res.json())
        .then((json) => setBooks(json.data));
    }
    
  }, [user, navigate]);


  return (
    <div>
      <h1>Welcome, {user ? user : "anonymous"}</h1>
      <ul>
        {books.map((book, index) => {
          return <li key={index}>{book.title} - {book.author}</li>
        } )}
      </ul>
    </div>
  );
}

export default HomePage;
