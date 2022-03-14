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
        this.previousPosition = null
    }

    updateStatus(status) {
        this.status = status
        this.onStatusChange(status)
    }

    onStatusChange(status) {}

    renderIcon() {
        return <BsBrush/>
    }

    plotLine(context, startPosition, endPosition, color) {
        if (!context) return
        
        context.fillStyle = colorToCanvasColor(color)
        
        // Find Δx and Δy
        let deltaX = Math.abs(endPosition.x - startPosition.x)
        let deltaY = Math.abs(endPosition.y - startPosition.y)

        // Find slope with +1 or -1 to determine next pixel
        let slopeX = (startPosition.x < endPosition.x) ? 1 : -1
        let slopeY = (startPosition.y < endPosition.y) ? 1 : -1

        let deltaError = deltaX - deltaY
        
        const currentPosition = {...startPosition}

        let drawing = true
        while(drawing) {
            context.clearRect(currentPosition.x, currentPosition.y, this.options.scale, this.options.scale)
            context.fillRect(currentPosition.x, currentPosition.y, this.options.scale, this.options.scale)

            // If we have hit the end position, set drawing to false
            drawing = currentPosition.x !== endPosition.x || currentPosition.y !== endPosition.y

            const e2 = 2*deltaError

            if (e2 > -deltaY) { deltaError -= deltaY; currentPosition.x += slopeX; }
            if (e2 < deltaX) { deltaError += deltaX; currentPosition.y += slopeY; }
        }
    }

    drawPixel(context, position, color) {
        if (!context) return
        context.fillStyle = colorToCanvasColor(color)
        // Clears before placing color again so it doesn't add up with transparency ect...
        context.fillRect(position.x, position.y, this.options.scale, this.options.scale)
        if (this.drawing) this.updateStatus(`Drawing pixel at ${position.x}, ${position.y}`)
    }

    mouseDown(position, color) {
        this.drawing = true
        this.drawPixel(this.canvasContext, position, color)
    }

    mouseUp(position, color) {
        this.drawing = false
        this.previousPosition = null
    }

    mouseMove(position, color) {
        const context = this.drawing ? this.canvasContext : this.previewCanvasContext
        this.drawPixel(context, position, color)

        if (this.drawing) {
            if (this.previousPosition) {
                this.plotLine(context, this.previousPosition, position, color)
            }
            this.previousPosition = position
        }
    }
}

export default new Brush()