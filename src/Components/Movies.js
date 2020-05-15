import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import Content from "./Content.js";


class MoviesList extends Component {
    state = {
        moviesList: ['tt0120903','tt1259521','tt0245429','tt0121164','tt0114369',
                    'tt0446029','tt1270798', 'tt0097814','tt0470752','tt1536537',
                    'tt0242423','tt6857112','tt0383060','tt0485947','tt0208185',
                    'tt0337563','tt0133093','tt4687108','tt2380307','tt0119282',],
        searchTerm: ''
    };

    render() {
        const { moviesList } = this.state;

        return (
            <div id="movies" className="movies-body">
                <div>
                    <h2>My Favorite Movies</h2>
                    <p>
                        I have a weird taste in movies, but these are some of my favorites! 
                    </p>
                </div>
                <div id="moviesList" className="moviesList"> 
                    {
                        moviesList.map(movie => (
                            <Movies movieID={movie} key={movie} />
                        ))
                    } 
                </div>  
            </div>
        );
    }
}

class Movies extends Component {
    state = {
        movieData: {}
    };

    componentDidMount() {
        axios
            .get(
                `https://www.omdbapi.com/?apikey=43545a60&i=${
                    this.props.movieID
                }`
            )
            .then(res => res.data)
            .then(res => {
                this.setState({ movieData: res });
            });
    }

    render() {
        const {
            Poster,
        } = this.state.movieData;

        return (
            <div className="movie-container">
                
                <div className="image-container">
                    <div className="poster">

                        <Popup 

                        contentStyle={
                            {border: "15px solid #EDBDB3", background: "#FAE4D2", minWidth: "569px"}
                        }

                        modal trigger = {<img src ={`${Poster}`}  
                        height="333.75" width="225" />}>

                            {<Content movieData = {this.state.movieData} />}
                        
                        </Popup>
                    
                        
                    </div>

                </div>
                
            </div>
        );
    }
}

export default MoviesList;

//sources used:
//https://www.florin-pop.com/blog/2019/02/react-movie-search-app/
//https://react-popup.elazizi.com/react-modal/
//used for Content.js as well