import * as shortId from "shortid"

const DEFAULT_WIDTH = 16
const DEFAULT_HEIGHT = 16

class Layer {
    constructor(name = null) {
        this.id = shortId.generate()
        this.name = name
        this.canvasRef = null // Reference to the actual canvas element it needs for drawing
        
        this.isVisible = true
        this.isLocked = false
        
        this.listeners = []
        
        this.width = DEFAULT_WIDTH
        this.height = DEFAULT_HEIGHT
    }

    setName(name) {
        this.name = name
        this.onUpdate()
    }

    onUpdate() {
        // console.log(`Layer updated (id = ${this.id})`)
        this.listeners.forEach(listener => listener())
    }

    addUpdateListener(listener) {
        this.listeners.push(listener)
    }

    removeUpdateListener(listener) {
        this.listeners = this.listeners.filter((l) => l !== listener)
    }

    toggleVisibility() {
        this.isVisible = !this.isVisible
        // console.log("Visibility =", this.isVisible)
        this.onUpdate()
    }

    toggleLock() {
        this.isLocked = !this.isLocked
        // console.log("Locked =", this.isLocked)
        this.onUpdate()
    }
}

export default Layer