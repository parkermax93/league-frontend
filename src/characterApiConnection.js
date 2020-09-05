class CharacterApiConnection {
    constructor(){ 
        this.baseUrl = "http://localhost:3000/characters"
    }

    //get
    getCharacters() {
        fetch(this.baseUrl).then(response => response.json()).then(json => createCharacters(json.data))
    }

    addCharacter(name, image_link, lane_id) {
        const form = event.target.parentElement 
        const characterAttributes = {
            "name": form[0].value,
            "image_link": form[1].value,
            "lane_id": form[2].value,
        };
        const character = new Character(characterAttributes)
        const configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(characterAttributes)
        };
        fetch(this.baseUrl, configurationObject)
        .then(response => response.json())
        .then(function(json) {
            character.createCharacterCard();
            toggleButtons();
            toggleForm();
        })
        .catch(error => console.log("Error: " + error))
    }

    getCharacterByLane() {
        clearCharacters();
        const lane = event.target.value
        console.log(lane)
        fetch(this.baseUrl).then(response => response.json()).then(json => loadCharactersForLane(json.data, lane))
        // .attributes can't be called on an array
    }
    
}