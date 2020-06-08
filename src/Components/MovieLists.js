import React, { Component } from 'react';
import firebase from '../firebase.js';
import axios from 'axios';

class MovieLists extends Component {
    constructor(){
        super();
        this.state ={
            list_title: '',
            lists: []
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
        const listsRef = firebase.database().ref('lists');
        const list = {
            list_title: this.state.list_title
        }
        listsRef.push(list);
        this.setState({
            list_title: ''
        });
        alert("List Successfully Created!")
    }
    
    render() {
        return (
            <div className='app'>
              <header>
                  <div className="wrapper">
                    <h1>Create a New List:</h1>
                                   
                  </div>
              </header>
              <div className='container'>
                <section className='add-list'>
                      <form onSubmit={this.handleSubmit}>
                        <input type="text" name="list_title" placeholder="List Title" onChange={this.handleChange} value={this.state.list_title} />
                        <button>Add List</button>
                      </form>
                </section>
              </div>
            </div>
          );
        }
      }
export default MovieLists;