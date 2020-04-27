import React, { Component } from 'react';
import './App.css';
import TabList from './Components/TabList';
import Body from './Components/Body';
import Head from './Components/Head';

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
      }
    ]

    return (
      <div className = "App">

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

      </div>
      
    );
  }
}

export default App;