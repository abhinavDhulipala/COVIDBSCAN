import React from "react";

const qBank = [
    {
        question:
            <div>
                Do you have any of the following? (Select any)
            </div>,
        answers: ["Fever or feeling feverish (such as chills, sweating)", "Cough",
            "Mild or moderate difficulty breathing", "Sore throat", "Muscle aches or body aches", "Vomiting or diarrhea",
            "New loss of taste or smell", "Congestion or runny nose", "Other symptoms"],
        correct: [""],
        questionId: "0"
    },
    {
        question:
            <div>
                Do you live in a long-term care facility, nursing home, or homeless shelter?
            </div>,
        answers: ["Yes", "No"],
        correct: [""],
        questionId: "1"
    },
    {
        question:
            <div>
                In the last two weeks, have you (they) worked, volunteered, or been a patient in a healthcare
                facility or worked as a first responder? Healthcare facilities include a hospital, medical or
                dental clinic, long-term care facility, or nursing home.
            </div>,
        answers: ["Yes", "No"],
        correct: [""],
        questionId: "2"
    },
    {
        question:
            <div>
                Do any of these apply to you?
                <ul>
                    <li> Chronic lung disease, such as moderate to severe asthma, COPD
                        (chronic obstructive pulmonary disease), cystic fibrosis, or pulmonary fibrosis </li>
                    <li> Serious heart condition, such as heart failure, cardiomyopathy, heart attack,
                        or blocked arteries to the heart </li>
                    <li> Weakened immune system or taking medications that may cause immune suppression </li>
                    <li> Obesity </li>
                    <li> Diabetes, chronic kidney disease, or liver disease </li>
                    <li> High blood pressure </li>
                    <li> Cancer </li>
                    <li> HIV </li>
                    <li> Blood disorder, such as sickle cell disease or thalassemia </li>
                    <li> Cerebrovascular disease or neurologic condition, such as stroke or dementia </li>
                    <li> Smoking or vaping </li>
                    <li> Pregnancy </li>
                </ul>
            </div>,
        answers: ["Yes", "No"],
        correct: [""],
        questionId: "3"
    },
];

//export default (n) => Promise.resolve(qBank.find(element => element === n));

export default (n) => Promise.resolve(qBank.sort().slice(n - 1, n));