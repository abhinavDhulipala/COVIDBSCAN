import React from 'react';
import './App.css';
import NavBar from "./components/NavBar";


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
            </div>
    );
}

export default App
