import * as shortId from "shortid"

class Layer {
    constructor() {
        this.id = shortId.generate()
    }
}

export default Layer()