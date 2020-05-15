import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = props => {
  const [updateMovie, setUpdateMovie] = useState({
    title: "",
    director: "",
    metascore: ""
  });

  //  Fetching movies from API to display movie information in input fields
  //  Without fetching the movie data, the values for each field is blank
  
  const fetchMovies = movieID => {
    axios
      .get(`http://localhost:5001/api/movies/${movieID}`)
      .then(response => setUpdateMovie(response.data))
      .catch(error => console.log(error.response));
  };

  // Use effect to display correct information in component
  // match gives us an object with isExact, params, path, and url
  // id of the movie, is listed under params
  useEffect(() => {
    fetchMovies(props.match.params.id);
  }, [props.match.params.id]);

  // this handle changes works for strings, numbers. Able to adjust title, director,
  // and metascore
  const handleChanges = event => {
    setUpdateMovie({ ...updateMovie, [event.target.name]: event.target.value });
  };

  // handle submit is to update the movie and then redirect the user to the home page
  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5001/api/movies/${updateMovie.id}`, updateMovie)
      .then(response => {
        console.log("This is from handleSubmit", response.data);
        props.history.push("/");
      });
  };

  return (
    <div>
      <h3>Updating Movies</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChanges}S
          placeholder="title"
          value={updateMovie.title}
        />
        <input
          type="text"
          name="director"
          onChange={handleChanges}
          placeholder="director"
          value={updateMovie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={handleChanges}
          placeholder="metascore"
          value={updateMovie.metascore}
        />
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;