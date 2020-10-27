const qBank = [
    {
        question:
            "Are you experiencing any of these symptoms?",
        answers: ["Fever or Feeling Feverish (chills, sweating)", "Difficulty Breathing (not severe)",
            "New or worsening cough", "Sore throat", "Whole Body Aches", "Vomiting or Diarrhea",
            "None of the Above"],
        correct: ["Fever or Feeling Feverish (chills, sweating)", "Difficulty Breathing (not severe)",
            "New or worsening cough", "Sore throat", "Whole Body Aches", "Vomiting or Diarrhea"],
        questionId: "1"
    },
];

export default (n = 5) =>
    Promise.resolve(qBank.sort().slice(0, n));