const CHARACTERS_URL = "http://localhost:3000/characters"
const LANES_URL = "http://localhost:3000/lanes"
const formSubmit = document.getElementById("form-submit")
const formButtons = document.getElementById("form-show-buttons")
const addCharacterButton = document.getElementById("add-character")
const dropDownButton = document.getElementById("filter-button")
const laneDropDown = document.getElementById("filter-dropdown")
const cardContainer = document.getElementById('character-card-container')

class Character {
    constructor({name, imageLink, laneId}) {
    this.name = name; 
    this.imageLink = imageLink;
    this.laneId = laneId;
    Character.all.push(this)
    }
    static all = []

    createCharacterCard() {
        const card = document.createElement('div')
        card.className = "card"
        const img = document.createElement('img')
        img.src = this.imageLink
        card.appendChild(img)
        const cardInfo = document.createElement('div')
        cardInfo.className = "card-info"
        const name = document.createElement('h1')
        name.innerHTML = this.name 
        cardInfo.appendChild(name)
        card.appendChild(cardInfo)
        cardContainer.appendChild(card)
    }
}

function getCharacters() {
    fetch(CHARACTERS_URL).then(response => response.json()).then(json => createCharacters(json.data))
}

function createCharacters(characters) {
    characters.forEach(character => new Character({...character.attributes}))
    Character.all.forEach(c => c.createCharacterCard())
    // const characterArray = []
    // for (character of characters) {
    //     // let laneArray = [];
    //     // for (lane of character.attributes.lane_id) {
    //     //     laneArray.push(lane.)
    //     // }
    //     // laneArray.push(new Character(character.attributes.name, character.attributes.image_link, character.attributes.lane_id ))
    // }
    // return addCharactersToDom(characterArray)
}

function addCharactersToDom(characterArray) {
    for (character of characterArray) {
        character.createCharacterCard()
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMLoaded")
    getCharacters();
    formSubmit.addEventListener("click", function() {
        event.preventDefault();
        console.log("clicked")
        addCharacter();
    })
    addCharacterButton.addEventListener("click", function() {
        toggleForm();
        toggleButtons();
    })
    dropDownButton.addEventListener("click", function() {
        toggleDropDown();
        toggleButtons();
    })
    laneDropDown.addEventListener("change", function() {
        getRandomCharacterByLane();
    })
})

function toggleForm() {
    const form = formSubmit.parentElement;
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
    } else {
        form.className += " hidden";
    }
}

function clearCharacters() {
    cardContainer.innerHTML = ""
}

function toggleDropDown() {
    const dropDown = document.getElementById("filter-drop-down")
    if (dropDown.classList.contains("hidden")) {
        dropDown.classList.remove("hidden");
    } else {
        dropDown.ClassName += " hidden"
    }
    getLanes();
}

// function toggleDropDown() {
//     const dropDown = document.getElementById("filter-drop-down")
//     if (dropDown.classList.contains("hidden")) {
//         dropDown.classList.remove("hidden");
//     } else {
//         dropDown.ClassName += " hidden"
//     }
//     getLanes();
// }

function getLanes() {
    fetch(LANES_URL).then(response => response.json()).then(json => populateLaneDropDown(json.data))
}

function populateLaneDropDown(data) {
    console.log(data)
    for (lane of data) {
        let option = document.createElement("option")
        option.value = lane.attributes.name
        option.innerHTML = lane.attributes.name
        laneDropDown.appendChild(option)
    }
}

function toggleButtons() {
    if (formButtons.classList.contains("hidden")) {
        formButtons.classList.remove("hidden");
    } else {
        formButtons.className += " hidden";
    }
}

function addCharacter() {
    const form = event.target.parentElement 
    const character = new Character(form[0].value, form[1].value, form[2].value)
    const configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "name": form[0].value,
            "image_link": form[1].value,
            "lane_id": form[2].value,
        })
    };
    fetch(CHARACTERS_URL, configurationObject)
    .then(response => response.json())
    .then(function(json) {
        character.createCharacterCard();
        toggleButtons();
        toggleForm();
    })
    .catch(error => console.log("Error: " + error))
}