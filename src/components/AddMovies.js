import { useState } from "react";
import Style from "./AddMovies.module.css";

function AddMovies(props) {
    const [title, settitle]= useState("")
    const [Optext, setOpText]= useState("")
    const [Date, setDate]= useState("")

    function getTitle(e){
        settitle(e.target.value)
    }
    function getOpText(e){
        setOpText(e.target.value)
    }
    function getDate(e){
        setDate(e.target.value)
    }

    function addBtnhandler(e){
        e.preventDefault()
       const Movie={
        title:title,
        Optext:Optext,
        Date:Date
        }

        props.AddMoviesHandler(Movie)
    }


  return (
    <form className={Style.Addform}>
      <div>
        <label>Title</label>
        <input value={title} type="text" onChange={getTitle}></input>
      </div>
      <div className={Style.OpeningText}>
        <label>Opening Text</label>
        <textarea value={Optext} type="text" onChange={getOpText}></textarea>
      </div>
      <div>
        <label>Release Date</label>
        <input value={Date} type="date" onChange={getDate}></input>
      </div>
      <button onClick={addBtnhandler}>Add Movie</button>
    </form>
  );
}
<label></label>;

export default AddMovies;
