import React from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from "./index";
import { ThemeProvider, StyleReset, Div, Button } from 'atomize';
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import {Link} from "react-router-dom";
import {BrowserRouter as Router} from  "react-router-dom"

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
