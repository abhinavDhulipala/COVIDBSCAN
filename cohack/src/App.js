import React from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";


const theme = {
    colors: {
        buttonColor: "info700"
    },
    textSize: {
        size: "heading"
    },
    shadows: {
        buttonShadow: "5"
    }
};

function App() {
    return (
            <div className="App">
                <NavBar />
                <HomePage />
            </div>
    );
}

export default App
