import React, {Component} from 'react'
import './app.css'

export default class Home extends Component {
    render() {
        return (
            <div className="homeInfo">
                <div className="foodItem">
                    <p className="itemText"></p>
                    <img src="https://static.thenounproject.com/png/1968827-200.png" alt="food bowl" className="bowlPicture"/>
                </div>
                <div className="statementContainer">
                    <p className="welcomeStatement">Welcome to Kibble Cruncher.</p>
                    <p>A page to track your dog's food!</p>
                </div>
            </div>
        )
    }
}