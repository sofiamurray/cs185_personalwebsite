import React, { Component } from 'react';
import Home from './Home'
import Images from './Images'
import Videos from './Videos'
import ExtLinks from './ExtLinks'


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
            document.title="Cooking| Sofia's Corner"
            return <ExtLinks/>
        }
    }
    render() {
        return (
            this.displayContent()  
        );
    }
}

export default Body;