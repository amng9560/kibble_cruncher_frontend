import React, {Component} from 'react'
import './app.css'

export default class FoodAmount extends Component {

    state = {
        food_id: this.props.food_id,
        cup_quantity: ""
    }

    handleChange = (event) => {
        const { name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {editFoodAmount} = this.props
        editFoodAmount(this.state)
        this.setState({
            cup_quantity: ""
        })
    }
    
    render(){
        const {cup_quantity} = this.state
        return (
            <div className="FoodAmount">
                <form className="cupToPound" onSubmit={this.handleSubmit}>
                <input 
                        id="cup_quantity" 
                        type="number" 
                        name="cup_quantity" 
                        value={cup_quantity}
                        step="0.5"
                        placeholder ="0.5, 1, 1.5..." 
                        onChange={this.handleChange}
                    />
                    <input className="feedDogButton" type="submit" value="Feed Pet!"/>
                </form>
            </div>
        )
    }
}