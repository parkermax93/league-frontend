class Character {

    constructor({name, image_link, lane_id}) {
    this.name = name; 
    this.image_link = image_link;
    this.lane_id = lane_id;
    Character.all.push(this)
    }
    static all = []

    createCharacterCard() {
        const card = document.createElement('div')
        card.className = "card"
        const img = document.createElement('img')
        img.src = this.image_link
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

