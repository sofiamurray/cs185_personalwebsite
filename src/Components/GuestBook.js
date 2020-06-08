import React, { Component } from 'react';
import firebase from '../firebase.js';

class GuestBook extends Component {
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
        <div id = "gbook" className="gbook">
            <header>
                                    
            </header>
            
            <div className='form_container'>
                
                <section className='add-item'>

                    <h3> Leave Me a Message!</h3>
                    
                    <form onSubmit={this.handleSubmit}>
                        <p className='form_label' ><r>* </r>Name:</p>
                        <input type="text" name="name" placeholder="must be longer than 5 characters, less than 20" minLength='5' maxLength='20' onChange={this.handleChange} value={this.state.name} required/>
                            
                        <p className='form_label'>Email: (will not be posted) </p>
                        <input type="text" name="email" onChange={this.handleChange} value={this.state.email} />

                        <p className='form_label'>Description:</p>
                        <textarea name="description" placeholder=" must be less than 100 character"  maxLength={100} rows="5" cols="60" onChange={this.handleChange} value={this.state.description} />

                        <p className='form_label'><r>* </r>Would you like your name and message to be visible to other guests? </p>
                        <select id="visibility" name="visibility"  onChange={this.handleChange} value={this.state.visibility} required = "true">
                            <option value="" selected disabled="true">Select an Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                            
                        <p className='form_label'><r>* </r>Message:</p>
                        <textarea name='message' placeholder=" must be longer than 15 characters, less than 500 characters" minLength='15' maxLength='500' rows="8" cols="60" onChange={this.handleChange} value={this.state.message} required></textarea> 

                        <div id="send">
                        <button>Send Message</button>
                        </div>
                    </form>
              </section>
              
              <section className='display-item'>
                  <div className="postedMessages">
                  <h3>Messages:</h3>
                    <ul>
                      {this.state.data.map((item) => {
                        return (
                            <li key={item.id}>
                                <div id="message_name">
                                    <p> {item.name} </p>
                                </div>
                                <div id="message_description">
                                    <p> {item.description} </p>
                                </div>
                                <div id="message_body">
                                    <p> {item.message} </p>
                                </div>
                                <div id="message_date">
                                    <p> {item.date} </p>
                                </div>
                                
                                
                                
                                
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
export default GuestBook;

//https://css-tricks.com/intro-firebase-react/
