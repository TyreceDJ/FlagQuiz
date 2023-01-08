let answerList = [];

export function randomL(size) {
    let answer = Math.floor(Math.random() * size)
    answerList.push(answer)
    let numList = [answer]

    for (let i = 0; i < 3; i++) {
        let randNum = Math.floor(Math.random() * size)   

        while (numList.includes(randNum) || answerList.includes(randNum)) {
            randNum = Math.floor(Math.random() * size) 

        } 
        numList.push(randNum)

    }
    return numList

}

export function shuffle(array) {
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

export function createCard(game) {
    let cardInfo = game.cardList[game.currentQ-1];

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

    // Create and change the answer choice text
    for (let i = 0; i < 4; i++) {
        let answerDoc = document.getElementById('ans' + (i+1));
        answerDoc.innerHTML = cardInfo.answerChoices[i];

    }
    document.getElementById('qNumber').innerHTML = game.currentQ + ' / 10';

}

export function createCardInfo(data, fun) {
    let list = [];

    const getNameList = list => {
        let retList = [];
    
        for (let i = 0; i < 4; i++) {
            retList.push(fun.getName(data, list[i]));
        }
        return retList;
    
    }

    for (let i = 0; i < 10; i++) {
        let randomList = randomL(data.length);
        let answerName = fun.getName(data, randomList[0]);
        let answerChoices = shuffle(getNameList(randomList));

        list.push({
            image: fun.getImage(data, randomList[0]),
            answerName: answerName,
            answerNumber: 1 + answerChoices.findIndex(name => name === answerName),
            answerChoices: answerChoices
        });
    }
    return list;

}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));

} 
