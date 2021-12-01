import {colorToCanvasColor} from "../utils/colors"
import {BsBrush} from "react-icons/bs"

class Pixel {
    constructor() {
        this.name = "Pixel"
        this.canvasContext = null
    }

    renderIcon() {
        return <BsBrush/>
    }

    drawPixel(context, position, color) {
        if (!context) return
        console.log(`Drawing pixel at ${position.x}, ${position.y}`)
        context.fillStyle = colorToCanvasColor(color)
        // Clears before placing color again so it doesn't add up with transparency ect...
        context.clearRect(position.x, position.y, 1, 1)
        context.fillRect(position.x, position.y, 1, 1)
    }

    mouseDown(position) {
        this.position = position 
    }

    mouseUp(position, color) {
        this.drawPixel(this.canvasContext, position, color)
    }

    mouseMove(context, x, y, color) {
        
    }
}

export default new Pixel()