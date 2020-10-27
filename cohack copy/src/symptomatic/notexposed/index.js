import React from "react";

const qBank = [
    {
        question:
            <div>
                In the two weeks before you felt sick, did you care for or have close contact (within 6 feet
                of an infected person for at least 15 minutes) with someone with symptoms of COVID-19, tested for
                COVID-19, or diagnosed with COVID-19?
            </div>,
        answers: ["Yes", "No"],
        correct: ["Yes", "No"],
        questionId: "0"
    },
];

//export default (n) => Promise.resolve(qBank.find(element => element === n));

export default (n) => Promise.resolve(qBank.sort().slice(n - 1, n));