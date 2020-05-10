import React, { Component } from 'react';
import firebase from '../firebase.js';

class Test extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            description: '',
            message: '',
            visibility: '',
            errMsg:'',
            data: []
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
        const dataRef = firebase.database().ref('data');
        const item = {
            name: this.state.name,
            email: this.state.email,
            description: this.state.description,
            message: this.state.message,
            visibility: this.state.visibility,
            date: new Date().toLocaleString(),
        }
    

        dataRef.push(item);
        this.setState({
            name: '',
            email: '',
            description: '',
            message: '',
            visibility: '',
        });
        alert("Successfully Sent!")
      }
      componentDidMount() {
        const dataRef = firebase.database().ref('data');
        dataRef.on('value', (snapshot) => {
          let data = snapshot.val();
          let newState = [];
          for (let item in data) {
            if(data[item].visibility == "Yes"){
                newState.push({
                    id: item,
                    name: data[item].name,
                    email: data[item].email,
                    description: data[item].description,
                    message: data[item].message,
                    visibility: data[item].visibility,
                    date: data[item].date
                });
            }
          }
          this.setState({
            data: newState
          });
        });
      }
      removeItem(itemId) {
        const itemRef = firebase.database().ref(`/data/${itemId}`);
        itemRef.remove();
      }
      render() {
        return (
          <div className='app'>
            <header>
                  <h1>Guest Book</h1>                    
            </header>
            <div className='form_container'>
              
              <section className='add-item'>
                  
                    <form onSubmit={this.handleSubmit}>
                            <label className='form_label' >Name:</label>
                            <input type="text" name="name" placeholder="must be longer than 5 characters, less than 20" minLength='5' maxLength='20' onChange={this.handleChange} value={this.state.name} required/>
                            
                            <label className='form_label'>Email: (will not be posted) </label>
                            <input type="text" name="email" onChange={this.handleChange} value={this.state.email} />

                            <label className='form_label'>Description:</label>
                            <textarea name="description" placeholder="must be less than 100 character" rows="2" maxLength={100}  onChange={this.handleChange} value={this.state.description} />

                            <label className='form_label'>Would you like your name and message to be visible to other guests? </label>
                            <select id="visibility" name="visibility"  onChange={this.handleChange} value={this.state.visibility} required = "true">
                                <option value="" selected disabled="true">Select an Option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <br></br>
                            
                            <label className='form_label'>Message:</label>
                            <textarea name='message' placeholder="must be longer than 15 characters, less than 500 characters" minLength='15' maxLength='500' rows="4" onChange={this.handleChange} value={this.state.message} required></textarea> 


                      <button>Send Message</button>
                    </form>
              </section>
              <section className='display-item'>
                  <div className="postedMessages">
                    <ul>
                      {this.state.data.map((item) => {
                        return (
                            <li key={item.id}>
                                <p className="message_name"> {item.name} </p>
                                <p className="message_date"> {item.date} </p>
                                <p className="message_description"> {item.description} </p>
                                <p className="message_body"> {item.message} </p>

                                <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                            </li>
                        )
                      })}
                    </ul>
                  </div>
              </section>
            </div>
          </div>
        );
      }
    }
export default Test;