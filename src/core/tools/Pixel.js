import {colorToCanvasColor} from "../utils/colors"
import {BsBrush} from "react-icons/bs"

class Pixel {
    constructor() {
        this.name = "Pixel"
        this.usesColors = true
        
        this.previewCanvasContext = null
        this.canvasContext = null
        this.options = {
            scale : 1
        }
        this.drawing = false
    }

    renderIcon() {
        return <BsBrush/>
    }

    drawPixel(context, position, color) {
        if (!context) return
        context.fillStyle = colorToCanvasColor(color)
        // Clears before placing color again so it doesn't add up with transparency ect...
        context.fillRect(position.x, position.y, this.options.scale, this.options.scale)
    }

    mouseDown(position, color) {
        console.log(`Drawing pixel at ${position.x}, ${position.y}`)
        this.position = position
        this.drawing = true
        this.drawPixel(this.canvasContext, position, color)
    }

    mouseUp(position, color) {
        this.drawing = false
    }

    mouseMove(position, color) {
        if (this.drawing) console.log(`Drawing pixel at ${position.x}, ${position.y}`)
        const context = this.drawing ? this.canvasContext : this.previewCanvasContext
        this.drawPixel(context, position, color)
    }
}

export default new Pixel()