import { colorToCanvasColor } from "../utils/colors"

class Lines {
    constructor() {
        this.name = "Lines"
        this.startPosition = null
    }

    isDrawing() {
        return !!this.startPosition
    }

    drawLine(context, startPosition, endPosition, color) {
        console.log(`Drawing line`)
        context.strokeStyle = colorToCanvasColor(color)
        context.beginPath()
        context.imageSmoothingEnabled = false
        context.moveTo(startPosition.x, startPosition.y)
        context.lineTo(endPosition.x, endPosition.y)
        context.globalAlpha = 1.0
        context.stroke()
        context.closePath()
    }

    mouseDown(context, x, y, color) {
        if (!this.isDrawing()) {
            // Set initial position of the line
            this.startPosition = {x, y}
        }
        else {
            // Draw the line from initial position to end position
            this.drawLine(context, this.startPosition, {x, y}, color)
            this.startPosition = null
        }
    }
}

export default new Lines()