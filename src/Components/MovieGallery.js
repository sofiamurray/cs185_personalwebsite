import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import firebase from '../firebase.js';
import Popup from "reactjs-popup";
import Content from "./Content.js";


class MoviesList extends Component {
    constructor(props) {
    super(props);
    this.state = {
        movies: [],
        lists: ['All'],
        currList: 'All',
        loaded: 8,
        searchMovie:'',
        movieCount:0,
        showLoad:"block"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.getLists = this.getLists.bind(this);
    this.showList = this.showList.bind(this)
    this.getMovies = this.getMovies.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.displayLoadMore = this.displayLoadMore.bind(this);

}

    async componentDidMount() { 
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
        this.getMovies();
        this.getLists();
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    async getMovies() {
        //console.log("IN GET MOVIES")

        const movieRef = firebase.database().ref('movies');

        const load = this.state.loaded;



        await movieRef.on('value', (snapshot) => {
            var fullCount = snapshot.numChildren();
            this.setState({
                movieCount: fullCount
            });
        })

        movieRef.limitToFirst(load).on('value', (snapshot) => {
            
            let movieData = snapshot.val();
            let newState = [];
            for(let movie in movieData) {
                //console.log("PUSH: "+movieData[movie].title);
                
                newState.push({
                    movieID: movieData[movie].movieID,
                    title: movieData[movie].title,
                    poster: movieData[movie].poster,
                    imdbRating: movieData[movie].imdbRating,
                    metaScore: movieData[movie].metaScore,
                    plot: movieData[movie].plot,
                    awards: movieData[movie].awards,
                    director: movieData[movie].director,
                    inLists: movieData[movie].inLists
                });

            }

            this.setState({
                movies: newState
            });
            
            this.displayLoadMore();
            //console.log("MOVIE COUNT: "+this.state.movieCount);

            });
        
    }

    getLists(){
       //console.log("IN GET LISTS FUNCTION")
        const listRef = firebase.database().ref('lists')
        listRef.on('value', (snapshot) => {
            let newState = [];
            snapshot.forEach(list => {
                var thing = list.val();
                newState.push(thing.list_title);
            })

            this.setState({lists: newState});
            //console.log("AVAILABLE LISTS");
            //console.log(this.state.lists)
        });
    }

    async showList(currList) {

        //console.log("IN SHOW LIST FUNCTION");   
        
        if(this.state.currList != currList){
            await this.updateCurrList(currList);
        }
        //console.log("current list to be displayed: " + this.state.currList);
        
        var fullList = 0

        if(this.state.currList === 'All'){
            this.getMovies();
        }else{
            const load = this.state.loaded;
            const listInMovie = firebase.database().ref('movies');
            listInMovie.on('value', (snapshot) => {
                let movieData = snapshot.val();
                let newState = [];
                for(let movie in movieData){
                    let listData = movieData[movie].inLists;
                    let listPresent = false;
                    for(var i=0; i<listData.length;i++){
                        //console.log(listData[i]);
                        if(listData[i] === this.state.currList){
                            listPresent = true;
                        }  
                    }
                    //console.log(listPresent)

                    if(listPresent){
                        fullList++;
                        if(newState.length < load){

                            newState.push({
                                movieID: movieData[movie].movieID,
                                title: movieData[movie].title,
                                poster: movieData[movie].poster,
                                imdbRating: movieData[movie].imdbRating,
                                metaScore: movieData[movie].metaScore,
                                plot: movieData[movie].plot,
                                awards: movieData[movie].awards,
                                director: movieData[movie].director,
                                inLists: movieData[movie].inLists
                            });
                        
                        //console.log("length: " + newState.length)
                        //console.log("load: " + load)
                        }
                    }
                    
                }
                //console.log("NEWSTATE IN SHOWLIST FUNC");
                //console.log(newState);
                this.setState({
                    movies: newState,
                    movieCount: fullList
                  });

                this.displayLoadMore();
                //console.log("AFTER SET STATE IN SHOWLIST FUNC");
                //console.log(this.state.movies);
            });
        }
        

      }

    updateCurrList(list) {
        this.setState({
            currList: list,
            loaded: 8
          })
      }



    async handleSearchSubmit(e){
        e.preventDefault();
        const searchMovie = this.state.searchMovie;
        await this.setState({
            movies: [],
            movieCount: 1
        });
        var fullList = 0;
        const movieRef = firebase.database().ref('movies');
        movieRef.on('value', (snapshot) => {
            let movieData = snapshot.val();
            let newState = [];
            for(let movie in movieData) {
                //console.log(movieData[movie].title);
                if(movieData[movie].title === searchMovie){
                    //console.log("found movie:"+ searchMovie)
                    fullList++;
                    newState.push({
                        movieID: movieData[movie].movieID,
                        title: movieData[movie].title,
                        poster: movieData[movie].poster,
                        imdbRating: movieData[movie].imdbRating,
                        metaScore: movieData[movie].metaScore,
                        plot: movieData[movie].plot,
                        awards: movieData[movie].awards,
                        director: movieData[movie].director,
                        inLists: movieData[movie].inLists
                    });
                    break;


                    
                }
            }
            //console.log("INSIDE SEARCH FUNCTION");

            //console.log(newState);

            this.setState({
                movies: newState,
                searchMovie: '',
            });

            
            //console.log("MOVIES TO BE DISPLAYED");
            //console.log(this.state.movies);
            
        });

        await this.displayLoadMore(); 
        
         
    }

    updateLoaded(loaded) {
        var load = loaded+8;
        this.setState({
            loaded: load
            });
        }

    async loadMore() {    
        console.log("LOADED:" + this.state.loaded);      
        await this.updateLoaded(this.state.loaded)
        const currList = this.state.currList;
        if(currList === "All"){
            this.getMovies();
        }else{
            this.showList(currList);
        }
        this.displayLoadMore();
    }


    async displayLoadMore(){
        console.log("DISPLAY LOAD MORE");
        console.log(this.state.movieCount);
        console.log(this.state.loaded);

        if(this.state.movieCount > this.state.loaded){
            await this.setState({showLoad: "visible"});
        }else{
             await this.setState({showLoad:"hidden"});
        }

    }
    render() {
        //console.log("STATE IN RENDER:");
        //console.log(this.state);
        console.log(this.state.showLoad)
        return (
            <div id="movies" className="movies-body">
                <div>
                    <h2>My Favorite Movies</h2>
                    <p>
                        I have a weird taste in movies, but these are some of my favorites! 
                    </p>
                </div>

                <select name="currList" onChange={e => this.showList(e.target.value)} >
                    <option value="" selected disabled="true">Pick A List:</option>
                    {this.state.lists.map((list) => {
                        return <option value={list}>{list}</option>
                    })}
                </select>

                <form onSubmit={this.handleSearchSubmit}>
                    <input type="text" name="searchMovie" placeholder="Movie Title" onChange={this.handleChange} value={this.state.searchMovie}/>
                    <div id="send">
                        <button >Search Movie</button>
                    </div>
                </form>


                <div id="moviesList" className="moviesList">
                    {
                        this.state.movies.map((movie) => {
                            return <MovieGallery movie={movie}/>
                        })
                    } 
                </div> 
                
                
                
                <div id="loadButton" >
                    <button style={{visibility:this.state.showLoad}} className="load" id="load" onClick={this.loadMore}>Load More</button>
                </div> 



            </div>
        );
    }
}

class MovieGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            director: '',
            poster: '',
            imdbRating: '',
            plot: '',
            movieID: '',

            inLists: [],
            listToAdd: '',
            lists: ['All'],
            currList: 'All'
        }

    }

        async componentDidMount() {

            if (!firebase.apps.length) {
                firebase.initializeApp(config)
            }
            this.getLists();
            
           //console.log("INSIDE MOVIEGALLERY")
           //console.log("setting state")
           //console.log(this.props.movie)

            this.setState({
                title: this.props.movie.title,
                director: this.props.movie.director,
                poster: this.props.movie.poster,
                imdbRating: this.props.movie.imdbRating,
                plot: this.props.movie.plot,
                movieID: this.props.movie.movieID,
                inLists: this.props.movie.inLists
               
            });
           //console.log(this.state.title)
        }
        componentDidUpdate(prevProps){
            //console.log("COMP DID UPDATE")
            if(this.props !== prevProps){
                //console.log("???????");
                this.componentDidMount();
            }
        }
        

        getLists(){
            const listRef = firebase.database().ref('lists')
            listRef.on('value', (snapshot) => {
                var newState = [];
                snapshot.forEach(list => {
                    var thing = list.val();
                    newState.push(thing.list_title);
                })
                this.setState({lists: newState});
            })
        }

        async addMovietoList(e){
            //console.log("IN ADDMOVIETOLIST FUNC")

            var list = e.target.value;
            //console.log("list: " + list);
            //console.log("this.state.inLists  before:" + this.state.inLists);
            
            const movieRef = firebase.database().ref(`/movies/${this.state.movieID}/inLists`);      
            var listAdded = this.state.inLists;
            listAdded.push(list);

            movieRef.set(listAdded);

            //console.log("movieRef: " + movieRef);

            this.setState({
                inLists: movieRef
            })

            //console.log("this.state.inLists after:" + this.state.inLists);
            window.location.reload(false);
            alert("movie added to "+list)
        }

        notInList = () => {
            var allLists = this.state.lists;
            var inLists = this.state.inLists;
            var listOptions = [];
            
            for(var i=0; i<allLists.length; i++){
                var currList = allLists[i];
                var present = inLists.includes(currList);
                if(!present){
                    listOptions.push(<option value={currList}>{currList}</option>);
                }
            }
            
            return(listOptions);

 
        }

         async removeMovie(movieID) {
            const movieRef = firebase.database().ref(`/movies/${movieID}`);
            movieRef.remove(); 
            window.location.reload(false);
            alert("Movie Successfully Deleted")
            //need to add refresh
    }



        render() {
        //console.log("THIS STATE IN SINGULAR MOVIE");
        //console.log(this.state);

        return (
            <div className="movie-container">

                
                <div className="image-container">



                    

                    <div className="poster">

                        <Popup 
                        contentStyle={
                            {border: "15px solid #EDBDB3", background: "#FAE4D2", minWidth: "569px"}
                        }

                        modal trigger = {<img src ={this.state.poster}  
                        height="333.75" width="225" />} lockScroll>

                            <div className="modal">
                                    
                                    <img src = {this.state.poster} />

                                    <div className="movie-text"> 
                                        <div className="movie-title"> {this.state.title} </div>
                                        <div className="rating"> 
                                            <span> Imdb Score: {this.state.imdbRating} </span>
                                            <span> Metascore: {this.state.Metascore} </span>
                                        </div>
                                        <div className="movie-plot"> {this.state.plot} </div>
                                        <div className="movie-awards"> {this.state.awards} </div>
                                        <div className="movie-director"> Directed By: <span>{this.state.director}</span> </div>
                                        <div className="movie-runtime"> {this.state.runtime} </div>
                                        
                                        <select name="listToAdd" onChange={e => this.addMovietoList(e)} >
                                            <option value="" selected disabled="true">Add to List:</option>
                                                {this.notInList()}
                                        </select>
                                        
                                    
                                        <button onClick={() => this.removeMovie(this.state.movieID) }>Remove</button>
                                    </div>
                            
                            </div>  
                            
                        
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
