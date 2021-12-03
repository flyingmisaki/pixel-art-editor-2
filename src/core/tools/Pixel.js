import {colorToCanvasColor} from "../utils/colors"
import {BsBrush} from "react-icons/bs"

class Pixel {
    constructor() {
        this.name = "Pixel"
        this.usesColors = true
        
        this.canvasContext = null
        this.options = {
            scale : 1
        }
    }

    renderIcon() {
        return <BsBrush/>
    }

    drawPixel(context, position, color) {
        if (!context) return
        console.log(`Drawing pixel at ${position.x}, ${position.y}`)
        context.fillStyle = colorToCanvasColor(color)
        // Clears before placing color again so it doesn't add up with transparency ect...
        context.clearRect(position.x, position.y, this.options.scale, this.options.scale)
        context.fillRect(position.x, position.y, this.options.scale, this.options.scale)
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