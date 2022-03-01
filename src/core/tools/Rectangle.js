import {colorToCanvasColor} from "../utils/colors"
import {BsSquare} from "react-icons/bs"

class Rectangle {
    constructor() {
        this.name = "Rectangle"
        this.usesColors = true
        this.status = ""
        
        this.previewCanvasContext = null
        this.canvasContext = null
        this.options = {
            scale : 1
        }

        this.startPosition = null
    }

    updateStatus(status) {
        this.status = status
        this.onStatusChange(status)
    }

    onStatusChange(status) {}

    renderIcon() {
        return <BsSquare/>
    }

    isDrawing() {
        return !!this.startPosition
    }

    drawPixel(context, position, color) {
        if (!context) return
        context.fillStyle = colorToCanvasColor(color)
        // Clears before placing color again so it doesn't add up with transparency ect...
        context.fillRect(position.x, position.y, this.options.scale, this.options.scale)
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
            context.fillRect(currentPosition.x, currentPosition.y, this.options.scale, this.options.scale)

            // If we have hit the end position, set drawing to false
            drawing = currentPosition.x !== endPosition.x || currentPosition.y !== endPosition.y

            const e2 = 2*deltaError

            if (e2 > -deltaY) { deltaError -= deltaY; currentPosition.x += slopeX; }
            if (e2 < deltaX) { deltaError += deltaX; currentPosition.y += slopeY; }
        }
    }

    plotRectangle(context, startPosition, endPosition, color) {
        const p1 = startPosition
        const p2 = {x : endPosition.x, y : startPosition.y}
        const p3 = endPosition
        const p4 = {x : startPosition.x, y : endPosition.y}
        this.plotLine(context, p1, p2, color)
        this.plotLine(context, p2, p3, color)
        this.plotLine(context, p3, p4, color)
        this.plotLine(context, p4, p1, color)
    }

    mouseDown(position) {
        this.startPosition = position
    }

    mouseUp(position, color) {
        // Draw the line from initial position to end position
        this.plotRectangle(this.canvasContext, this.startPosition, position, color)
        this.updateStatus(`Rectangle drawn between (${this.startPosition.x}, ${this.startPosition.y}) and (${position.x}, ${position.y})`)
        this.startPosition = null
    }

    mouseMove(position, color) {
        if (this.isDrawing()) {
            this.plotRectangle(this.previewCanvasContext, this.startPosition, position, color)
        }
        else {
            const context = this.previewCanvasContext
            this.drawPixel(context, position, color)
        }
    }
}

export default new Rectangle()