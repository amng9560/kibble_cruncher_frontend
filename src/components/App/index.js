import React, {Component} from 'react';
import Navigation from '../Navigation';
import Home from '../Home'
import FoodBowl from '../FoodBowl'
import Food from '../Food'
import Login from '../Login'

const userUrl = "https://kibble-cruncher.herokuapp.com/users/"
const foodUrl = "https://kibble-cruncher.herokuapp.com/foods/"
const petUrl = "https://kibble-cruncher.herokuapp.com/pets/"

export default class App extends Component {
    state = {
        currentPage: 'Home',
        user: false,
        pets: [],
        foods: []
    }

    switchPage = (clickedPage) => {
        this.setState({
            currentPage: clickedPage
        })
    }

    logInUser = (user) => {
        return (
            localStorage.getItem('authToken')
                    ? this.setState({user})
                    : null
        )
    }

    logOutUser = (event) => {
        event.preventDefault()
        this.setState({
            user: false,
        })
    }

    fetchCall = (url, method, body) => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('authToken')
        }
        return fetch(url, {method, headers, body})
    }

    // parseJson = (response) => {
    //     return response.json()
    // }

    fetchPets = () => {
        const { id } = this.state.user
        
        this.fetchCall(`${userUrl}${id}/pets/`, "GET")
            .then(response => response.json())
            .then(response => {
                this.setState({
                    pets: response.data,
                    foods: response.data.map(pet => {
                        const { foods } = pet.attributes
                        return foods
                    })
                })
        })
    }

    addPet = (pet) => {
        const { id } = this.state.user
        const body = JSON.stringify({...pet, user_id: id})

        return this.fetchCall(`${userUrl}${id}/pets/`, "POST", body)
        .then(response => response.json())
        .then(pet => {
            this.setState({
                pets: [...this.state.pets, pet.data]
            })
        })
    }

    addFood = (foodWithPetId) => {
        const body = JSON.stringify({...foodWithPetId})

        return this.fetchCall(foodUrl, "POST", body)
        .then(response => response.json())
        .then(food => {
            this.setState({
                foods: [...this.state.foods, [food]]
            })
        })
    }

    editPet = (petId, updatedPet) => {
        const { id } = this.state.user
        const body = JSON.stringify({...updatedPet, user_id: id})
        return this.fetchCall(`${userUrl}${id}/pets/${petId}`, "PATCH", body)
        .then(response => response.json())
        .then(() => {
            this.setState({
                pets: [
                    ...this.state.pets.map(existingPet => {
                        if(existingPet.id === petId){
                            const newAttributes = Object.assign(existingPet.attributes, updatedPet)
                            const updatedAttributes = {attributes: newAttributes}
                            return Object.assign(existingPet, updatedAttributes)
                        } else {
                            return existingPet
                        }
                    }) 
                ]
            })
        })
    }

    editFoodAmount = (food) => {
        const body = JSON.stringify({amount: food})

        return this.fetchCall(`${foodUrl}${food.food_id}`, "PATCH", body)
    }

    deleteFood = (id) => {
        const newState = this.state.foods.flat().filter(f => f.id !== id)
        this.setState({ foods: newState })

        this.fetchCall(`${foodUrl}${id}`, "DELETE")
    }

    deletePet = (id) => {
        const newState = this.state.pets.filter(p => p.id !== id)
        this.setState({pets: newState})

        this.fetchCall(`${petUrl}${id}`, "DELETE")
    }

    render(){
        const pages = {
            "Home": <Home />,
            "Login": <Login 
                logInUser={this.logInUser} 
                logOutUser={this.logOutUser} 
                inUseUser={this.state.user} 
                fetchPets={this.fetchPets}
            />,
            "Food Bowl": <FoodBowl 
                pets={this.state.pets}
                foods={this.state.foods} 
                addPet={this.addPet} 
                editPet={this.editPet} 
                deletePet={this.deletePet}
                addFood={this.addFood}
                deleteFood={this.deleteFood}
                editFoodAmount={this.editFoodAmount}
            />,
            "Food List": <Food />
        }
        const {user} = this.state
        return(
            <div className="App">
                <Navigation 
                    switchPage={this.switchPage}
                    userLoggedIn={user}
                />
                {pages[this.state.currentPage]}
            </div>
        )
    }
}