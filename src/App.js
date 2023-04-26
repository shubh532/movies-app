import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [Movies,SetMovies]=useState([])


  async function MovieHandler(){
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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={MovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={Movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
