import React, { Component } from 'react'
import './app.css'

export default class DogForm extends Component {
    state = {
        name: "",
        breed: "",
        birth_date: "",
        animaltype: ""
    }

    componentDidMount(){
        const { defaultValues } = this.props
        defaultValues && this.setState(defaultValues)
    }

    handleChange = (event) => {
        const { name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { submitHandler } = this.props
        submitHandler(this.state)
        this.setState({
            name: "",
            breed: "",
            birth_date: "",
            animaltype: ""
        })
    }

    render(){
        const {name, breed, birth_date, animaltype} = this.state
        return (
            <div className="createNewDog">
                <h3 className="newDog">Add A dog</h3>
                <form onSubmit={this.handleSubmit} className="newDogForm">
                    <label htmlFor="name">Pet's Name</label>
                    <input 
                        id="name" 
                        type="text" 
                        name="name" 
                        value={name} 
                        onChange={this.handleChange} 
                        placeholder="Ted, Bibxy, Mesa..."
                    />
                    <label htmlFor="breed">Pet's Breed</label>
                    <input 
                        id="breed" 
                        type="text" 
                        name="breed" 
                        value={breed} 
                        onChange={this.handleChange} 
                        placeholder="Golden Retriever, Chow Chow..."
                    />
                    <label htmlFor="birthday">Pet's Date of Birth</label>
                    <input 
                        id="birthday" 
                        type="date" 
                        name="birth_date" 
                        value={birth_date} 
                        onChange={this.handleChange}
                    />
                    <label htmlFor="type">Animal type</label>
                    <input 
                        id="type" 
                        type="text" 
                        name="animaltype" 
                        value={animaltype} 
                        onChange={this.handleChange} 
                        placeholder="Dog, Cat..."
                    />
                    <input className="submitButton" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}