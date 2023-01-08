import { answerHandler } from "./gamePlayer.js";

export const correctColor = 'var(--correctColor)';

export const incorrectColor = 'var(--incorrectColor)';

let answerList = [];
// Random list of numbers in size
function randomL(size) {
    const answer = Math.floor(Math.random() * size);
    answerList.push(answer);
    let numList = [answer];

    for (let i = 0; i < 3; i++) {
        let randNum = Math.floor(Math.random() * size); 

        while (numList.includes(randNum) || answerList.includes(randNum)) {
            randNum = Math.floor(Math.random() * size);

        } 
        numList.push(randNum);

    }
    return numList;

}

// Shuffle the items of an array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

// Create and display card
export function createCard(game) {
    const cardInfo = game.cardList[game.currentQ-1];

    const oldImage = document.querySelector('img');
    // Check if image element exist and update the image
    if (document.contains(oldImage)) {
        oldImage.src = cardInfo.image;
        oldImage.alt = cardInfo.answerName;

    } else {
        // Initialize the img document and create the image
        const image = document.createElement('img');
        image.src = cardInfo.image;
        image.alt = cardInfo.answerName;
        document.getElementById('image').appendChild(image);
    }

    // Create and change the answer choice text
    for (let i = 0; i < 4; i++) {
        const answerDoc = document.getElementById('ans' + (i+1));
        answerDoc.innerHTML = cardInfo.answerChoices[i];
    }
    // Change the answer number
    document.getElementById('qNumber').innerHTML = game.currentQ + ' / 10';

}

// Return the name list using polymorphic functions
function getNameList (data, list, fun) {
    let retList = [];

    for (let i = 0; i < 4; i++) {
        retList.push(fun.getName(data, list[i]));
    }
    return retList;
}

// Create a list of all the card information
export function createCardInfo(data, fun) {
    let list = [];

    for (let i = 0; i < 10; i++) {
        const randomList = randomL(data.length);
        const answerName = fun.getName(data, randomList[0]);
        const answerChoices = shuffle(getNameList(data, randomList, fun));

        list.push({
            image: fun.getImage(data, randomList[0]),
            answerName: answerName,
            answerNumber: 1 + answerChoices.findIndex(name => name === answerName),
            answerChoices: answerChoices
        });
    }
    return list;
}

// Reset buttons after color change
export function buttonReset(element) {
    for (let i = 0; i < element.length; i++) {
        element[i].style.color = 'white';
        element[i].style.backgroundColor = 'transparent';
        element[i].style.textShadow = '0px 0px 10px rgb(150, 150, 150)';
    }
}

// Highlight green on the correct answers and return its element
export function showCorrect(game) {
    const answerNumber = game.cardList[game.currentQ-1].answerNumber;
    const answerBox = document.getElementById('ans' + answerNumber);
    answerBox.style.backgroundColor = correctColor;
    return answerBox;
}

// Check if input event is the correct answer choice 
export function isCorrectChoice(event, game) {
    const answerNumber = game.cardList[game.currentQ-1].answerNumber;
    const responseNumber = event.target.getAttribute('id')[3];
    return responseNumber == answerNumber;
}

let anEleList = [];

for (let i = 1; i <= 4; i++) {
    anEleList.push(document.getElementById('ans' + i));
}

// Set answer choices event listeners
export function addListener() {
    for (let i = 0; i < 4; i++) {
        anEleList[i].addEventListener('click', answerHandler);
    }
}

// Remove answer choices event listeners
export function removeListener() {
    for (let i = 0; i < 4; i++) {
        anEleList[i].removeEventListener('click', answerHandler);
    }
}

/* Delay function
 *  - Adds smooth functionality between each transition
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 
