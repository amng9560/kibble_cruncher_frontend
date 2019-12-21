import React, {Component} from 'react'
import './app.css'
// import EditDogForm from "../EditDogForm"
import DogForm from "../DogForm"
import FoodForm from "../FoodForm"
import FoodAmount from "../FoodAmount"
let moment = require('moment');

export default class Card extends Component {
    state = {
        card: true,
        editForm: false,
        FoodForm: false
    }

    toggleEditForm = () => {
        this.setState({
            editForm: !this.state.editForm,
            card: !this.state.card
        })
    }

    toggleFoodForm = () => {
        this.setState({
            FoodForm: !this.state.FoodForm
        })
    }

    submitHandler = (updatedPet) => {
        const {pet} = this.props
        this.props.editPet(pet.id, updatedPet)
        this.setState({
            editForm: !this.state.editForm
        })
    }

    render(){
        const age = (date_string) => {
            let birthDate = moment(date_string).format("YYYY-MM-DD")
            let currentDate = moment().format("YYYY-MM-DD")
            let ageInYears = moment(currentDate).diff(birthDate, 'years')
            return ageInYears
        }

        const expirationDate = (date_string) => {
            let date = moment(date_string).format("YYYY-MM-DD")
            let currentDate = moment().format("YYYY-MM-DD")
            let expirationDate = moment(date).diff(currentDate, 'days')
            return expirationDate
        }
        const {data, pet, deletePet, editFoodAmount, deleteFood, addFood } = this.props
        // console.log("pet in card", pet)
        // console.log('data', data)
        const {name, breed, birth_date, animaltype} = pet.attributes
            
        return  pet
                ?   (
                    <div className="dogCard">
                        <h3>Name: {name}</h3>
                        <p>Breed: {breed}</p>
                        <p>Age: {age(birth_date)}</p>
                        <p>Animal:{animaltype}</p>
                        <div className="buttonContainer">
                            <img 
                                className='petCardEditButton' 
                                onClick={() => this.toggleEditForm()} 
                                src='https://image.flaticon.com/icons/svg/1159/1159633.svg' 
                                alt='update button'
                            />
                            <img 
                                className='petDeleteButton' 
                                onClick={() => deletePet(pet.id)} 
                                src='https://image.flaticon.com/icons/svg/59/59836.svg' 
                                alt='delete button'
                            />
                            <button className="addFoodButton" onClick={this.toggleFoodForm}>Add a Dog's Food</button>
                        </div>
                        {this.state.editForm
                            ? <DogForm 
                                id={pet.id} 
                                pet={pet} 
                                defaultValues={{name, breed, birth_date, animaltype}} 
                                toggleEditForm={this.toggleEditForm}
                                submitHandler={this.submitHandler}
                            />
                            : null
                        }
                        {this.state.FoodForm 
                            ? <FoodForm 
                                id={pet.id} 
                                toggleFoodForm={this.togglFoodForm} 
                                addFood={addFood}
                            />
                            : null
                        }
                    </div>
                    )
                :(
                    <div className="foodCard">
                        <h3>Name:{data.name}</h3>
                        <p>Brand: {data.brand}</p>
                        <p>Days until expired: {expirationDate(data.expiration_date)}</p>
                        <p>Amount left: {data.amount}</p>
                        <div className="foodButtonContainer">
                            <img 
                                className='foodDeleteButton' 
                                onClick={() => deleteFood(data.id)} 
                                src='https://image.flaticon.com/icons/svg/59/59836.svg' 
                                alt='delete button'
                            />
                            <FoodAmount food_id={data.id} editFoodAmount={editFoodAmount}/>
                        </div>
                    </div>
                )

    }    
}