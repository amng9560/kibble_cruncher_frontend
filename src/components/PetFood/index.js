import React from 'react'
import Card from "../Card"
import './app.css'

export default ({foods, deleteFood, editFoodAmount}) => {
    
    function createCards(){
        if(foods !== undefined || foods !== [null] ) {
            return foods.flat().map((food, i) => {
                return <Card key={i} data={food} deleteFood={deleteFood} editFoodAmount={editFoodAmount}/>
            })
        }
    }

    return (
        <div className="foodContainer"> 
            <h1>Pet Food</h1>
            {createCards()}
        </div>
    )
}