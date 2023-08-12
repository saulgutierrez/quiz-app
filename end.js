// Fetch HTML Elements
const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
// Catch data from the game.js file
const mostRecentScore = localStorage.getItem("mostRecentScore");
// Catch the array of highScores and parse it from the LocalStorage (boolean variable)
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;
// Print the score of the player on the DOM
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    e.preventDefault();
    // Create a JS object with all data fetched
    const score = {
        score: mostRecentScore,
        name: username.value
    }
    // Put the JS Object in array
    highScores.push(score);
    // Sort the scores in descending order
    highScores.sort((a, b) => {
        return b.score - a.score;
    });
    // Save the best five scores
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    // Go to homepage
    window.location.assign('/');
}