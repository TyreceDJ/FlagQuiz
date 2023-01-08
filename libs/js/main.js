import { shuffle } from './helper.js';

let debuggingGame = false;

let answerList = [];

let anEleList = [];
for (let i = 1; i <= 4; i++) {
    anEleList.push(document.getElementById('ans' + i));
}

// Random number generator
function randomCountries() {
    let answer = Math.floor(Math.random() * 259)
    answerList.push(answer)
    let numList = [answer]

    for (let i = 0; i < 3; i++) {
        let randNum = Math.floor(Math.random() * 259)   

        while (numList.includes(randNum) || answerList.includes(randNum)) {
            randNum = Math.floor(Math.random() * 259) 

        } 
        numList.push(randNum)

    }
    return numList

}

function createCardInfo(data) {
    let list = []

    for (let i = 0; i < 10; i++) {
        let dataObj = {};

        let countryList = randomCountries();
        let countryName = countryList.map(element => data[element].name);
        let shuffleCountry = shuffle(countryName);

        let answerImage = data[countryList[0]].image;
        let ansewrName = data[countryList[0]].name;

        dataObj.image = answerImage;
        dataObj.answerName = ansewrName;
        dataObj.answerChoices = shuffleCountry;
        dataObj.answerNumber = 1 + shuffleCountry.findIndex(name => name === ansewrName);

        list.push(dataObj)
    }
    return list

}

let game;
let currentTimer;
let landPage = document.getElementById('landPage');
let gamePage = document.getElementById('card');
let endPage = document.getElementById('endPage');

class Game {
    constructor(data) {
        this._answerCardList = createCardInfo(data);
        this._incorrectQuestions = [];
        this._currentQuestion = 1;
    }

    card() {
        let self = game;
        return self._answerCardList[self._currentQuestion-1];
    }

    createCard() {
        let cardInfo = this.card();
        let oldImage = document.querySelector('img');

        if (document.contains(oldImage)) {
            oldImage.src = cardInfo.image;
            oldImage.alt = cardInfo.answerName;

        } else {
            let image = document.createElement('img');
            image.src = cardInfo.image;
            image.alt = cardInfo.answerName;
            document.getElementById('image').appendChild(image);

        }

        // Create the answer choices
        for (let i = 0; i < 4; i++) {
            let answerDoc = document.getElementById('ans' + (i+1));
            answerDoc.innerHTML = cardInfo.answerChoices[i];

        }
        document.getElementById('qNumber').innerHTML = this._currentQuestion + ' / 10';

        currentTimer = setTimeout(incorrectChoice, 5000);
        addListener()

    }

    incorrect(ansewred) {
        let self = game;
        let cardInfo = self.card();
        if (ansewred) {
            clearTimeout(currentTimer);
        }  else {
            for (let i = 0; i < 4; i++) {
                anEleList[i].addEventListener('click', answerHandler);
                
            }
        }

        self._incorrectQuestions.push({
            image: cardInfo.image,
            name: cardInfo.answerName
        });
        self.nextQuestion();

    } 

    nextQuestion() {
        this._currentQuestion += 1;
        if (this._currentQuestion > 10) {
            gamePage.style.display = 'none'
            endPage.style.display = 'flex'

        } else {
            this.createCard();

        }
    }

    get answerNumber() {
        let cardInfo = this.card();
        return cardInfo.answerNumber;
    }
}

function removeListener() {
    for (let i = 0; i < 4; i++) {
        anEleList[i].removeEventListener('click', answerHandler);
        
    }
}

async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

async function stateGame() {
    document.getElementById('play').removeEventListener('click', stateGame)
    await sleep(500)

    landPage.style.display = "none"
    gamePage.style.display = "flex"
    let data = await getJson("libs/json/countries.json")

    game = new Game(data)
    
    game.createCard()
}

async function incorrectChoice() {

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

    let ansewrBox = document.getElementById('ans' + game.answerNumber);

    ansewrBox.style.backgroundColor = 'var(--correctColor)';

    await sleep(1000);
    ansewrBox.style.color = 'white';
    ansewrBox.style.backgroundColor = 'transparent';
    ansewrBox.style.textShadow = '0px 0px 10px rgb(150, 150, 150)';
    await sleep(500);

    game.incorrect(false);
}

async function answerHandler(event) {

    // Clear the previous interval
    clearTimeout(currentTimer);

    removeListener();

    let responseNumber = event.target.getAttribute('id')[3];

    let isCorrect = false || responseNumber == game.answerNumber;

    let css = event.target.style;
    css.backgroundColor = isCorrect ? 'var(--correctColor)' : 'var(--incorrectColor)';

    // Transition the next card
    await sleep(500);
    css.color = 'white';
    css.backgroundColor = 'transparent';
    css.textShadow = '0px 0px 10px rgb(150, 150, 150)';

    if (!isCorrect) {
        let correctBox = document.getElementById('ans' + game.answerNumber);
        correctBox.style.backgroundColor = 'var(--correctColor)';

        await sleep(1000);
        correctBox.style.color = 'white';
        correctBox.style.backgroundColor = 'transparent';
        correctBox.style.textShadow = '0px 0px 10px rgb(150, 150, 150)';
        await sleep(500);
    }

    // Set next card or end page
    isCorrect ? game.nextQuestion() : game.incorrect(true)

}

// Starts the game
document.getElementById('play').addEventListener('click', stateGame);

function addListener() {
    for (let i = 0; i < 4; i++) {
        anEleList[i].addEventListener('click', answerHandler)
    
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 

if (debuggingGame) {
    stateGame()
}