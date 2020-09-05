class LaneApiConnection {
    constructor(){ 
        this.baseUrl = "http://localhost:3000/lanes"
    }

    //get
    getLanes(selectElement) {
        fetch(this.baseUrl).then(response => response.json()).then(json => populateLaneDropDown(json.data, selectElement))
    }
}