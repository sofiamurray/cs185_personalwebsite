import React, { Component } from 'react';
import firebase from '../firebase.js';
import axios from 'axios';

class MovieAdd extends Component {
    constructor(){
        super();
        this.state ={
            movieID: '',
            title: '',
            poster: '',
            imdbRating: '',
            metaScore: '',
            plot: '',
            awards: '',
            director: '',
            actors: '',
            inLists: ["All"],
            movies: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();

        axios
            .get(
                `https://www.omdbapi.com/?apikey=43545a60&i=${
                    this.state.movieID
                }`
            )
            .then(res => 
                {let ref = firebase.database().ref(`/movies/${this.state.movieID}`);
                ref.set ({
                    movieID: this.state.movieID,
                    title: res.data.Title,
                    poster: res.data.Poster,
                    imdbRating: res.data.imdbRating,
                    metaScore: res.data.Metascore,
                    plot: res.data.Plot,
                    awards: res.data.Awards,
                    director: res.data.Director,
                    actors: res.data.Actors,
                    inLists: this.state.inLists
                });

            })
            .catch(error => {
                console.log(error);
                alert("Imdb ID not recognized")
            })
        
        
    }

    render() {
        return (
            <div className='app'>
              <header>
                  <div className="wrapper">
                    <h1>Add a Movie:</h1>
                                   
                  </div>
              </header>
              <div className='container'>
                <section className='add-movie'>
                      <form onSubmit={this.handleSubmit}>
                        <input type="text" name="movieID" placeholder="Movie's Imdb ID" onChange={this.handleChange} value={this.state.movieID} />
                        <button>Add Movie</button>
                      </form>
                </section>
              </div>
            </div>
          );
        }
      }
export default MovieAdd;