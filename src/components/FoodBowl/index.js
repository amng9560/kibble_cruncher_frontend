import React from "react"
import Dogs from "../Dogs"
import PetFood from "../PetFood"
import './app.css'

export default ({pets, foods, editPet, addPet, deleteFood, deletePet, addFood, editFoodAmount}) => {
    return(
        <main>
            <Dogs 
                editPet={editPet}  
                addPet={addPet} 
                deletePet={deletePet} 
                pets={pets} 
                addFood={addFood}
            />
            <PetFood 
                foods={foods}  
                pets={pets}
                deleteFood={deleteFood} 
                editFoodAmount={editFoodAmount}
            /> 
        </main>
    )
}