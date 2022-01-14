import {colorToCanvasColor} from "../utils/colors"
import {BsBrush} from "react-icons/bs"

class Brush {
    constructor() {
        this.name = "Brush"
        this.usesColors = true
        this.status = ""
        
        this.previewCanvasContext = null
        this.canvasContext = null
        this.options = {
            scale : 1,
            AA : false,
            replace : false
        }
        this.drawing = false
    }

    updateStatus(status) {
        this.status = status
        this.onStatusChange(status)
    }

    onStatusChange(status) {}

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
        this.position = position
        this.drawPixel(this.canvasContext, position, color)
        this.drawing = true
        if (this.drawing) this.updateStatus(`Drawing pixel at ${position.x}, ${position.y}`)
    }

    mouseUp(position, color) {
        this.drawing = false
    }

    mouseMove(position, color) {
        if (this.drawing) this.updateStatus(`Drawing pixel at ${position.x}, ${position.y}`)
        const context = this.drawing ? this.canvasContext : this.previewCanvasContext
        this.drawPixel(context, position, color)
    }
}

export default new Brush()