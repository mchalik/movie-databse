import React from 'react';
import './style.css';

const PLACEHOLDER_IMAGE_POSTER =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

const Movie = ({ movie }) => {
  const poster = movie.Poster === 'N/A' ? PLACEHOLDER_IMAGE_POSTER : movie.Poster;
   return (
     <div className="movie">
     <h2>{movie.Title}</h2>
       <div className="poster">
         <img width="200" src={poster} alt={`The movie titled: {movie.Title}`}/>
       </div>
       <p>({movie.Year})</p>
     </div>
   )
};

export default Movie;