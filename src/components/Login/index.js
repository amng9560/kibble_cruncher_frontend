import React, { Component } from 'react'
import './app.css'

export default class Login extends Component {
    state = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        existingUser: false
      }

      loggingIn = () => {
        if (this.state.existingUser === false){
          return this.signUpForm()
        }
      }

      toggleExistingUser = () => {
          this.setState({existingUser: !this.state.existingUser})
      }

      handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
          [name]: value
        })
      }

      handleSubmit = (event) => {
        event.preventDefault()
        const request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(this.state)
        }
        this.state.existingUser
          ? this.logIn(request) 
          : this.createUser(request)
      }

      createUser = (request) => {
        fetch("http://localhost:3000/users", request)
          .then(response => response.json())
          .then(response => {
            if (!response.error) {
              this.logIn(request)
            } 
          })
          .then(
            this.setState({
              firstname: "",
              lastname: "",
              username: "",
              password: ""
            })
          )
          .catch(error => console.log(error))
      }
      
      logIn = (request) => {
        fetch("http://localhost:3000/authenticate", request)
          .then(response => response.json())
          .then(response => {
            localStorage.setItem('authToken', response.auth_token)
            this.props.logInUser(response.user)
          })
          .then(
            this.setState({
              username: "",
              password: ""
            })
          )
          .then(response => this.props.fetchPets())
          .catch(error => console.log(error))
      }

      signUpForm = () => {
        return (
          <form className="createUser">
            <input 
              className="firstName" 
              onChange={this.handleChange} 
              type="text" name="firstname" 
              placeholder="First Name" 
            />
            <input 
              className="name" 
              onChange={this.handleChange} 
              type="text" 
              name="lastname" 
              placeholder="Last Name" 
            />
          </form>
        )
      }

      componentDidMount = () => {
        localStorage.removeItem('authToken')
        return this.props.inUseUser !== false ? this.props.logOutUser() : null
      }

      render() {
        return (
          <div className="signInContainer">
            <div className="signIn">
              <h3>{this.state.existingUser ? "Log In" : "Sign Up"}</h3>
              <form className="userForm" onSubmit={this.handleSubmit}>
                {this.loggingIn()}
                <input onChange={this.handleChange} type="text" name="username" placeholder="Username"/>
                <input onChange={this.handleChange} type="password" name="password" placeholder="Password"/>
                <input className="submitButton" id="submit" type="submit"/>
              </form>
              <h4 onClick={this.toggleExistingUser}>{this.state.existingUser ? "Need to create an account?" : "Already a User"}</h4>
            </div>
          </div>
        )
      }
}