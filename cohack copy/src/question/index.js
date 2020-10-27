import React from "react";

const qBank = [
    {
        question: <div>
            Are you experiencing any of these symptoms?
            <ul>
                <li> Fever or Feeling Feverish (chills, sweating) </li>
                <li> Difficulty Breathing (not severe) </li>
                <li> New or worsening cough </li>
                <li> Sore throat </li>
                <li> Whole Body Aches </li>
                <li> Vomiting or Diarrhea </li>
            </ul>
        </div>,
        answers: ["Yes", "None of the Above"],
        correct: ["Yes", "None of the Above"],
        questionId: "0"
    },
];

export default (n = 1) =>
    Promise.resolve(qBank.sort().slice(0, n));