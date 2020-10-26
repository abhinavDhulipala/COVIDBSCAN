import React from 'react';
import "../index.css";

const Result = ({score,playAgain}) => (
    <div className="score-board">
        <div className="score"> Conditions: {score} </div>
        <button className="playBtn" onClick={playAgain} > New Quiz </button>
    </div>
)

export default Result;