import React, { Component } from 'react';
import './App.css';
import TabList from './Components/TabList';
import Body from './Components/Body';
import Head from './Components/Head';
import SimpleReactLightbox from "simple-react-lightbox"; 
import ScrollUpButton from "react-scroll-up-button";


class App extends Component {
  constructor(){
    super();
    this.state = {
      activeTab: 1
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }
  render() {
    const tabs = [
      {
        id: 1,
        title: 'Home'
      },
      {
        id: 2,
        title: 'Travel'
      },
      {
        id: 3,
        title: 'Music'
      },
      {
        id: 4,
        title: 'Cooking'
      },
      {
        id: 5,
        title: 'Guest Book'
      }
    ]

    return (
      <div className = "App">
        <SimpleReactLightbox>
        <ScrollUpButton />
        <div className = "head">
          <Head activeTab={this.state.activeTab}/>
        </div>

        <div className = "body">

          <div className = "nav-bar">
            <TabList tabs={tabs} 
            activeTab={this.state.activeTab}
            changeTab={this.changeTab}/>
          </div>
        
          <div className = "main-body">
            
            <Body activeTab={this.state.activeTab}/>
          </div>

        </div>

        </SimpleReactLightbox>
      </div>
      
    );
  }
}

export default App;