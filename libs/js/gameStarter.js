import { gameRunner, constructGame } from './gamePlayer.js';
import { sleep } from './helper.js';

const playButton = document.getElementById('play');

function countryGetName(data, element) {
    return data[element].name;

}

function countryGetImage(data, element) {
    return data[element].image

}

// Async function that returns the data from json
async function getJson(url) {
    const response = await fetch(url);
    const data = await response.json()
    return data;
}

// Starts the game by initializing a Game with JSON data and accessor functions
async function stateGame() {
    playButton.removeEventListener('click', stateGame);
    await sleep(500);

    const data = await getJson("libs/json/countries.json");

    const flagQuiz = constructGame(data, {
        getImage: countryGetImage,
        getName: countryGetName
    });

    // Changes the the game state
    document.getElementById('landPage').style.display = "none";
    document.getElementById('card').style.display = "flex";

    gameRunner(flagQuiz);
}

// Start button
playButton.addEventListener('click', stateGame);
