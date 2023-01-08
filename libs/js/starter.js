import { gameRunner, constructGame } from './flagGame.js';
import { sleep } from './helper.js';

let playButton = document.getElementById('play');

function countryGetName(data, element) {
    return data[element].name;

}

function countryGetImage(data, element) {
    return data[element].image

}

async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

async function stateGame() {
    playButton.removeEventListener('click', stateGame);
    await sleep(500);

    let data = await getJson("libs/json/countries.json");

    const flagQuiz = constructGame(data, {
        getImage: countryGetImage,
        getName: countryGetName
    });

    document.getElementById('landPage').style.display = "none";
    document.getElementById('card').style.display = "flex";

    gameRunner(flagQuiz);
}

// Start button
playButton.addEventListener('click', stateGame);
