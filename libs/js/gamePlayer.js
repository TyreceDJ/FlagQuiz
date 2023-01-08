import { buttonReset, sleep, createCard, createCardInfo, 
        addListener, removeListener, showCorrect, isCorrectChoice, 
        correctColor, incorrectColor } from './helper.js';

let gameTemp;

// Construct the game given polymorphic image and name accessor
export function constructGame(data, funObj) {
    return {
        cardList: createCardInfo(data, funObj),
        numberOfCorrect: 0,
        currentQ: 0,
        isCorrect: false
    };
}

// Update and handler each stage of the game
export function gameRunner(game) {
    gameTemp = game;
    game.currentQ += 1;

    if (game.currentQ > 10) {
        // Change to the end states
        removeListener();
        document.getElementById('card').style.display = 'none';
        document.getElementById('endPage').style.display = 'flex';
        console.log(game.numberOfCorrect);

    } else {
        if (game.isCorrect) {
            game.numberOfCorrect += 1;

        }
        // Set answer choice listeners and timer and set the question
        addListener();
        createCard(game);
        game.timer = setTimeout(timeoutHandler, 5000, game);

    }

}

// Handlers the functionality of the timeout animation sequence
async function timeoutHandler(game) {
    removeListener();

    // Change all the answers to red when out of time
    const buttons = document.getElementsByClassName('buttons');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = incorrectColor;

    }

    await sleep(1000);
    buttonReset(buttons);
    await sleep(500);

    // Show the correct answer
    const answerBox = showCorrect(game);

    await sleep(1000);
    buttonReset([answerBox]);
    await sleep(500);

    game.isCorrect = false;
    gameRunner(game);

}

// Handlers the functionality of the answer animation sequence
export async function answerHandler(event) {
    const game = gameTemp;
    clearTimeout(game.timer);
    removeListener();

    // Display color based on answer choice
    const isCorrect = isCorrectChoice(event, game);
    event.target.style.backgroundColor = isCorrect ? correctColor : incorrectColor;

    await sleep(500);
    buttonReset([event.target]);

    // Show the correct answer if incorrect
    if (!isCorrect) {
        await sleep(500);
        const correctBox = showCorrect(game);

        await sleep(1000);
        buttonReset([correctBox]);

    }
    await sleep(300);

    game.isCorrect = isCorrect;
    gameRunner(game);
    
}
