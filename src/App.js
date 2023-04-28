import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovies from "./components/AddMovies";

function App() {
  const [Movies, SetMovies] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, Seterror] = useState(null);
  const [Success, setSuccess] = useState(null);
  const [retry, setRetry] = useState(false);

  const MovieHandler = useCallback(async () => {
    setLoading(true);
    Seterror(null);
    try {
      const Response = await fetch(
        "https://react-moviesapp-7f47b-default-rtdb.firebaseio.com/Movies.json/"
      );
      if (!Response.ok) {
        throw new Error("Something Went Wrong...");
      }
      const Data = await Response.json();

      const loadMovies = [];

      for (const key in Data) {
        loadMovies.push({
          id: key,
          title: Data[key].title,
          openingText: Data[key].Optext,
          releaseDate: Data[key].Date,
        });
      }

      SetMovies(loadMovies);
    } catch (error) {
      Seterror(error.message);
      setRetry(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    MovieHandler();
  }, [MovieHandler]);

  useEffect(() => {
    if (retry) {
      const intervalId = setInterval(async () => {
        await MovieHandler();
        Seterror("Retrying...");
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [retry, MovieHandler]);

  function RetryCalcelBtn() {
    setRetry(false);
    Seterror("Try After SomeTime");
  }

  async function AddMoviesHandler(movie) {
    try {
      const Response = await fetch(
        "https://react-moviesapp-7f47b-default-rtdb.firebaseio.com/Movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const Data = await Response.json();
      setSuccess("Movie Sucessfully Added");
      console.log(Data);
    } catch {}
  }

  async function DeletMoviesHandler(id) {
  try {
    const response = await fetch(
      `https://react-moviesapp-7f47b-default-rtdb.firebaseio.com/Movies/${id}.json`,
      {
        method: "DELETE"
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("Movie deleted successfully!");
    SetMovies(Movies.filter((movie) => movie.id !== id))
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
}
  return (
    <React.Fragment>
      <section>
        <AddMovies AddMoviesHandler={AddMoviesHandler}></AddMovies>
        {Success && <h1>{Success}</h1>}
      </section>
      <section>
        <button onClick={MovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!Loading && !error && Movies.length === 0 && <h1>No data found</h1>}
        <MoviesList
          DeletMoviesHandler={DeletMoviesHandler}
          movies={Movies}
          Loading={Loading}
        />
        {!Loading && error && <h1>{error}</h1>}
        {retry && <button onClick={RetryCalcelBtn}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
