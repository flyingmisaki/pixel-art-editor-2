import { colorToCanvasColor } from "../utils/colors"
import {BsDashLg} from "react-icons/bs"

class Lines {
    constructor() {
        this.name = "Lines"
        this.startPosition = null
    }

    renderIcon() {
        return <BsDashLg/>
    }

    isDrawing() {
        return !!this.startPosition
    }

    plotLine(context, startPosition, endPosition, color) {
        console.log(startPosition, endPosition)
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
            context.fillRect(currentPosition.x, currentPosition.y, 1, 1)

            // If we have hit the end position, set drawing to false
            drawing = currentPosition.x !== endPosition.x || currentPosition.y !== endPosition.y

            // 
            const e2 = 2*deltaError

            if (e2 > -deltaY) { deltaError -= deltaY; currentPosition.x += slopeX; }
            if (e2 < deltaX) { deltaError += deltaX; currentPosition.y += slopeY; }
        }
        console.log(`Line drawn between (${startPosition.x}, ${startPosition.y}) and (${endPosition.x}, ${endPosition.y})`)
    }

    mouseDown(context, position, color) {
        this.startPosition = position
    }

    mouseUp(context, position, color) {
        // Draw the line from initial position to end position
        this.plotLine(context, this.startPosition, position, color)
        this.startPosition = null
    }

    mouseMove(context, position, color) {

    }
}

export default new Lines()