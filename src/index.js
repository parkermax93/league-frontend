const LEAGUE_URL = "http://localhost:3000/"

class Character {
    constructor(name, imageLink, laneID)
    this.name = name;
    this.imageLink= imageLink;
    this.laneID= laneID;
}

class createCharacterCard() {
        const cardContainer = document.getElementById('character-card-container')
        const card = document.CreateElement('div')
        card.className = "card"
        const img = document.createElement('img')
        img.src = this.imageLink
        card.appendChild(img)
        const cardInfo = document.createElement('div')
        cardInfo.className = "card-info"
        const name = document.createElement('h1')
        name.innerHTML = this.name 
        cardInfo.appendChild(name)
        const ul = document.createElement('ul')
        for (lane of this.laneID) {
            let li = document.createElement('li')
            li.innerHTML = lane 
            ul.appendChild(li)
        }
}

function getCharacters() {
    fetch(CHARACTERS_URL).then(response => response.json()).then(json => createCharacters(json.data))
}

function createCharacters(characters) {
    const characterArray = []
    for (character of characters) {
        let laneArray = [];
        for (lane of character.attributes.lane) {
            laneArray.push(lane.name)
        }
        laneArray.push(new Character(character.attributes.name, character.attributes.image_link, character.attributes.lane_id ))
    }
    return addCharactersToDom(characterArray)
}

function addCharactersToDom(characterArray) {
    for (character of characterArray) {
        character.createCharacterCard()
    }
}
