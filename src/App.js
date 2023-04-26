import React, { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';


function App() {
  const [Movies,SetMovies]=useState([])
  const [Loading,setLoading]=useState(false)


  async function MovieHandler(){
    setLoading(true)
    const Response= await fetch("https://swapi.dev/api/films/")
    const Data=await Response.json()

    const transformData=Data.results.map((data)=>{
      return {
      id:data.episode_id,
      title:data.title,
      openingText:data.opening_crawl,
      releaseDate:data.release_date
    }
    })
    SetMovies(transformData)
    setLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={MovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={Movies} Loading={Loading} />
      </section>
    </React.Fragment>
  );
}

export default App;
