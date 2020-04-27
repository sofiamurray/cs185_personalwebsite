import React, { Component } from 'react';
import Home from './Home'
import Images from './Images'
import Videos from './Videos'
import ExtLinks from './ExtLinks'

class Head extends Component {
    changeHead = () => {
        var activeTab = this.props.activeTab
        if(activeTab == 1){
            document.title="its working"
        }
        else if(activeTab == 2){
            return <Images/>
        }
        else if(activeTab == 3){
            return <Videos/>
        }
        else if(activeTab == 4){
            return <ExtLinks/>
        }
    }

    render() {
        return (
            <div class="header">
                <h1>Sofia's Lil Corner of the Web</h1>
            </div>
        );
    }
}

export default Head;