import React, { Component } from 'react';
import Home from './Home'
import Images from './Images'
import Videos from './Videos'
import ExtLinks from './ExtLinks'
import GuestBook from './GuestBook';
import Movies from './Movies';
import MovieGallery from './MovieGallery';
import MovieLists from './MovieLists';
import MovieAdd from './MovieAdd';



class Body extends Component {
    displayContent = () => {
        var activeTab = this.props.activeTab
        if(activeTab == 1){
            document.title="Home | Sofia's Corner"
            return <Home/>
        }
        else if(activeTab == 2){
            document.title="Travel | Sofia's Corner"
            return <Images/>
        }
        else if(activeTab == 3){
            document.title="Music | Sofia's Corner"
            return <Videos/>
        }
        else if(activeTab == 4){
            document.title="Cooking | Sofia's Corner"
            return <ExtLinks/>
        }
        else if(activeTab == 5){
            document.title="Guest Book | Sofia's Corner"
            return <GuestBook/>
        }
        else if(activeTab == 6){
            document.title="Movie Gallery | Sofia's Corner"
            return <MovieGallery/>
        }
        else if(activeTab == 7){
            document.title="Add Movie List | Sofia's Corner"
            return <MovieLists/>
        }
        else if(activeTab == 8){
            document.title="Add Movie | Sofia's Corner"
            return <MovieAdd/>
        }
    }
    render() {
        return (
            this.displayContent()  
        );
    }
}

export default Body;