import {colorToCanvasColor} from "../utils/colors"
import {BsBrush} from "react-icons/bs"

class Pixel {
    constructor() {
        this.name = "Pixel"
    }

    renderIcon() {
        return <BsBrush/>
    }

    drawPixel(context, x, y, color) {
        console.log(`Drawing pixel at ${x},${y}`)
        context.fillStyle = colorToCanvasColor(color)
        // Clears before placing color again so it doesn't add up with transparency ect...
        context.clearRect(x, y, 1, 1)
        context.fillRect(x, y, 1, 1)
    }

    mouseDown(context, x, y, color) {
        this.drawPixel(context, x, y, color)
    }
}

export default new Pixel()