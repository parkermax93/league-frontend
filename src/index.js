const LEAGUE_URL = "http://localhost:3000/"

class Character {
    constructor(name, imageLink, laneID)
    this.name = name;
    this.imageLink= imageLink;
    this.laneID= laneID;
}

class createCharacterCard() {
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