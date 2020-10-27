const qBank = [
    {
        question:
            "Do you currently or plan to within the next 2 weeks, work or volunteer in a " +
            "healthcare facility?",
        answers: ["Yes", "No"],
        correct: ["Yes", "No"],
        questionId: "0"
    },
    {
        question:
            "In the last 2 weeks, have you had any of the following exposures?",
        answers: ["Contact with a COVID-19 positive person", "International Travel",
        "Live in or have visited a place where COVID-19 is widespread", "No exposure"],
        correct: ["Contact with a COVID-19 positive person", "International Travel",
            "Live in or have visited a place where COVID-19 is widespread", "No exposure"],
        questionId: "1"
    },
];

//export default (n) => Promise.resolve(qBank.find(element => element === n));

export default (n) => Promise.resolve(qBank.sort().slice(n - 1, n));