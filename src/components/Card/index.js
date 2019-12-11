import React, {Component} from 'react'
import './app.css'
import EditDogForm from "../EditDogForm"
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
        const {data, pet, deletePet, editFoodAmount, deleteFood } = this.props

        return  pet
                ?   (
                    <div className="dogCard">
                        <h3>Name: {pet.attributes.name}</h3>
                        <p>Breed: {pet.attributes.breed}</p>
                        <p>Age: {age(pet.attributes.birth_date)}</p>
                        <p>Animal:{pet.attributes.animaltype}</p>
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
                            ? <EditDogForm id={pet.id} pet={pet} toggleEditForm={this.toggleEditForm} editPet={this.props.editPet} />
                            : null
                        }
                        {this.state.FoodForm 
                            ? <FoodForm id={pet.id} toggleFoodForm={this.togglFoodForm} addFood={this.props.addFood}/>
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