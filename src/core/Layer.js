import * as shortId from "shortid"

class Layer {
    constructor(name = null) {
        this.id = shortId.generate()
        this.name = name
        this.canvasRef = null // Reference to the actual canvas element it needs for drawing
    }
}

export default Layer