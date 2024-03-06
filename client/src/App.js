import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:8080/movies?");
        setMovies(res.data);
      } catch (err) {
        setError("Error fetching data");
      }
    };

    fetchMovies();
  }, []);

  console.log(movies);
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="Main-Container">
      <h1 style={{fontStyle:"italic", backgroundColor:"beige", width:"fit-content", margin:"auto", paddingBottom:"10px"}}>Welcome to the Movie Listing App</h1>
      <div className="MovieList">
        {movies.map((movie) => (
          <div key={movie._id} className="Render">
            <h2>Title: {movie.Title}</h2>
            <p>Year: {movie.Year}</p>
            <p>Gener: {movie.Category}</p>
            <p>Language: {movie.Language}</p>
          </div>
        ))}
      </div>
      {/* <div className="Main-Container">
        <h1>Welcome to Movie Listing App</h1>
        <div className="form">
          <label for="name">
            Movie Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Movie Title"
            value={name}
            required
            onChange={(e) => e.target.value}
          />
          <br />
          <label style={{ textAlign: "left" }} for="year">
            Movie Year<span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="year"
            type="number"
            placeholder="Movie Year"
            value={year}
            onChange={(e) => e.target.value}
            required
          />
          <br />
          <label style={{ textAlign: "left" }} for="type">
            Movie Type<span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="type"
            type="text"
            placeholder="Movie type"
            value={Category}
            onChange={(e) => e.target.value}
            required
          />
          <br />
          <label for="language">
            Movie Language<span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="language"
            type="text"
            placeholder="Movie language"
            value={language}
            onChange={(e) => e.target.value}
            required
          />
          <br />
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default App;
