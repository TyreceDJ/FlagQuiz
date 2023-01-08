import { randomL, shuffle, sleep, createCard, createCardInfo } from './helper.js';
import {  } from './starter.js';

let gameTemp;
let anEleList = [];
for (let i = 1; i <= 4; i++) {
    anEleList.push(document.getElementById('ans' + i));
}

export function constructGame(data, funObj) {
    return {
        cardList: createCardInfo(data, funObj),
        numberOfCorrect: 0,
        currentQ: 0,
        isCorrect: false
    };
}

export function gameRunner(game) {
    gameTemp = game;
    game.currentQ += 1;

    if (game.currentQ > 10) {
        removeListener();
        document.getElementById('card').style.display = 'none';
        document.getElementById('endPage').style.display = 'flex';

    } else {
        if (game.isCorrect) {
            game.numberOfCorrect += 1;

        }
        addListener();
        createCard(game);
        game.timer = setTimeout(timeout, 5000, game);

    }

}

async function timeout(game) {
    removeListener();


    for (let i = 0; i < 4; i++) {
        anEleList[i].style.backgroundColor = 'var(--incorrectColor)';
    }

    await sleep(1000)
    for (let i = 0; i < 4; i++) {
        anEleList[i].style.color = 'white';
        anEleList[i].style.backgroundColor = 'transparent';
        anEleList[i].style.textShadow = '0px 0px 10px rgb(150, 150, 150)';
    }
    await sleep(500);

    let answerNumber = game.cardList[game.currentQ-1].answerNumber;
    let answerBox = document.getElementById('ans' + answerNumber);

    answerBox.style.backgroundColor = 'var(--correctColor)';

    await sleep(1000);
    answerBox.style.color = 'white';
    answerBox.style.backgroundColor = 'transparent';
    answerBox.style.textShadow = '0px 0px 10px rgb(150, 150, 150)';
    await sleep(500);

    game.isCorrect = false;
    gameRunner(game);

}

async function answerHandler(event) {
    let game = gameTemp;
    clearTimeout(game.timer);
    removeListener();

    let answerNumber = game.cardList[game.currentQ-1].answerNumber;
    let responseNumber = event.target.getAttribute('id')[3];

    let isCorrect = responseNumber == answerNumber;

    let clickedButtonCss = event.target.style;
    clickedButtonCss.backgroundColor = isCorrect ? 'var(--correctColor)' : 'var(--incorrectColor)';

    // Transition the next card
    await sleep(500);
    clickedButtonCss.color = 'white';
    clickedButtonCss.backgroundColor = 'transparent';
    clickedButtonCss.textShadow = '0px 0px 10px rgb(150, 150, 150)';

    if (!isCorrect) {
        await sleep(500)
        let correctBox = document.getElementById('ans' + answerNumber);
        correctBox.style.backgroundColor = 'var(--correctColor)';

        await sleep(1000);
        correctBox.style.color = 'white';
        correctBox.style.backgroundColor = 'transparent';
        correctBox.style.textShadow = '0px 0px 10px rgb(150, 150, 150)';
        await sleep(500);

    }
    game.isCorrect = isCorrect;
    gameRunner(game);
    
}

function addListener() {
    for (let i = 0; i < 4; i++) {
        anEleList[i].addEventListener('click', answerHandler);
    
    }
}

function removeListener() {
    for (let i = 0; i < 4; i++) {
        anEleList[i].removeEventListener('click', answerHandler);
    
    }
}
