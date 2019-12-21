import React, { Component } from "react"
import DogForm from "../DogForm"
import Card from "../Card"
import './app.css'

export default class Dogs extends Component {
    state = {
        petForm: false
    }

    toggleDogForm = () => {
        this.setState({
            petForm: !this.state.petForm
        })
    }

    pets = () => this.props.pets.map((pet, i) => {
        return <Card 
            key={i} 
            pet={pet} 
            editPet={this.props.editPet} 
            addFood={this.props.addFood} 
            deletePet={this.props.deletePet}
        />
    })

    render () {
        return (
            <div className="dogContainer">
                <h1 className="petHeader">Pets</h1>
                {this.state.petForm 
                    ? <DogForm toggleDogForm={this.toggleDogForm} submitHandler={this.props.addPet}/>
                    : null
                }
                <button className="addDogButton" onClick={this.toggleDogForm}>Add a Dog</button>
                {this.pets()}
            </div>
        )
    }
}