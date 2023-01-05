fetch("libs/json/countries.json").then(response => response.json()).then(GameHandler)

answerList = []

function isIn(arr, x) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == x) {
            return true
        }
    }
    return false
}

function randomCountries() {
    let answer = Math.floor(Math.random() * 261)
    answerList.push(answer)
    let numList = [answer]

    for (let i = 0; i < 3; i++) {
        let randNum = Math.floor(Math.random() * 261)   

        while (isIn(numList, randNum) || isIn(answerList, randNum)) {
            randNum = Math.floor(Math.random() * 261) 

        } 
        numList.push(randNum)

    }
    return numList

}

function createImage(country) {
    let image = document.createElement('img')
    image.src = country.image
    image.alt = country.name
    document.getElementById('image').appendChild(image)

}

// Randomize an array
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

// Return the idex of the name 1-indexed
function findName(arr, name) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == name) {
            return i + 1
        }
    }
}

function GameHandler(data) {
    countryList = randomCountries()

    // Construct the image element
    createImage(data[countryList[0]])
    answer = data[countryList[0]].name

    // Randomize the answer choices
    countryList = shuffle(countryList)
    nameList = []

    for (let i = 0; i < 4; i++) {
        country = data[countryList[i]].name
        document.getElementById('ans' + (i+1)).innerHTML = country
        nameList.push(country)

    }
    // Find answer after randomization
    newAnswerNumber = findName(nameList, answer)
    console.log(newAnswerNumber)

}