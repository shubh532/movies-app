import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddForm from "./components/AddForm";

function App() {
  const [Movies, SetMovies] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, Seterror] = useState(null);
  const [retry, setRetry] = useState(false);

  const MovieHandler = useCallback(async () => {
    setLoading(true);
    Seterror(null);
    try {
      const Response = await fetch("https://swapi.dev/api/films/");
      if (!Response.ok) {
        throw new Error("Something Went Wrong...");
      }
      const Data = await Response.json();

      const transformData = Data.results.map((data) => {
        return {
          id: data.episode_id,
          title: data.title,
          openingText: data.opening_crawl,
          releaseDate: data.release_date,
        };
      });
      SetMovies(transformData);
    } catch (error) {
      Seterror(error.message);
      setRetry(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    MovieHandler();
  },[MovieHandler]);

  useEffect(() => {

    if (retry) {
      const intervalId = setInterval(async () => {
        await MovieHandler();
        Seterror("Retrying...");
      }, 5000);
      return () => clearInterval(intervalId);
    }
  },[retry]);

  function RetryCalcelBtn() {
    setRetry(false);
    Seterror("Try After SomeTime");
  }

  return (
    <React.Fragment>
      <section>
        <AddForm/>
      </section>
      <section>
        <button onClick={MovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!Loading && !error && Movies.length === 0 && <h1>No data found</h1>}
        <MoviesList movies={Movies} Loading={Loading} />
        {!Loading && error && <h1>{error}</h1>}
        {retry && <button onClick={RetryCalcelBtn}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
