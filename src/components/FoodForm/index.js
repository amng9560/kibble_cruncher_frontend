import React, { Component } from 'react'
import './app.css'

export default class FoodForm extends Component {
    state = {
        pet_id: this.props.id,
        name: "",
        brand: "",
        expiration_date: "",
        amount: ""
    }

    handleChange = (event) => {
        const { name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { addFood } = this.props
        addFood(this.state)
        this.setState({ 
            name: "",
            brand: "",
            expiration_date: "",
            amount: ""
        })
    }

    render(){
        console.log(this.props.id)
        const {name, brand, expiration_date, amount} = this.state
        return (
            <div className="createNewFood">
                <h3 className="newFood">Add Food</h3>
                <form onSubmit={this.handleSubmit} className="newFoodForm">
                    <label htmlFor="name">Food Name</label>
                    <input 
                        id="name" 
                        type="text" 
                        name="name" 
                        value={name} 
                        onChange={this.handleChange} 
                        placeholder="Pacific Stream, Premium Dog Food..."
                    />
                    <label htmlFor="brand">Food Brand</label>
                    <input 
                        id="brand" 
                        type="text" 
                        name="brand" 
                        value={brand} 
                        onChange={this.handleChange} 
                        placeholder="Purina, IAMS..."
                    />
                    <label htmlFor="expire">Expiration Date</label>
                    <input 
                        id="expire" 
                        type="date" 
                        name="expiration_date" 
                        value={expiration_date} 
                        onChange={this.handleChange}
                    />
                    <label htmlFor="amount">Bag of food - lbs</label>
                    <input 
                        id="amount" 
                        type="number" 
                        name="amount" 
                        value={amount}
                        placeholder ="12, 24, 60..." 
                        onChange={this.handleChange}
                    />
                    <input className="foodSubmitButton" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}