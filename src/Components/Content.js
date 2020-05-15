import React from 'react';

export default (props) => (
    <div className="modal">
        
        <img src = {props.movieData.Poster} />

        <div className="movie-text"> 
            <div className="movie-title"> {props.movieData.Title} </div>
            <div className="rating"> 
                <span> Imdb Score: {props.movieData.imdbRating} </span>
                <span> Metascore: {props.movieData.Metascore} </span>
            </div>
            <div className="movie-plot"> {props.movieData.Plot} </div>
            <div className="movie-awards"> {props.movieData.Awards} </div>
            <div className="movie-director"> Directed By: <span>{props.movieData.Director}</span> </div>
            <div className="movie-runtime"> {props.movieData.Runtime} </div>
        </div>
   
   </div>
  );

  