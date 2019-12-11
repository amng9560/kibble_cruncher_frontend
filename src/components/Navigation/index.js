import React from 'react';
import './app.css'

export default ({switchPage, userLoggedIn}) => {

    const handleClick = (event) => {
        event.preventDefault()
        switchPage(event.target.textContent)
    }

    return(
        userLoggedIn
        ?
        <header className="headerContainer">
            <div className="logoContainer">
                <img className="logo" src="https://www.freelogodesign.org/file/app/client/thumb/7a887583-5149-4427-b762-e06c6c934737_1000x600-watermark.png?20191203" alt="logo"/>
                <a href="/"><h1>Kibble Cruncher</h1></a>
            </div>
            <nav className="navBar">
                <li className="list" onClick={handleClick}>
                    Home
                </li>
                <li className="list" onClick={handleClick}>
                    Food Bowl
                </li>
                <li className="list" onClick={handleClick}>
                    Food List
                </li>
                <li className="list" onClick={handleClick}>
                    Log Out
                </li>
            </nav>
        </header>
        :
        <header className="headerContainer">
            <div className="logoContainer">
                <img className="logo" src="https://www.freelogodesign.org/file/app/client/thumb/7a887583-5149-4427-b762-e06c6c934737_1000x600-watermark.png?20191203" alt="logo"/>
                <a href="/"><h1>Kibble Cruncher</h1></a>
            </div>
            <nav className="navBar">
                <li className="list" onClick={handleClick}>
                    Home
                </li>
                <li className="list" onClick={handleClick}>
                    Food Bowl
                </li>
                <li className="list" onClick={handleClick}>
                    Food List
                </li>
                <li className="list" onClick={handleClick}>
                    Login
                </li>
            </nav>
        </header>
    )
}