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
        console.log(`Line drawn between (${startPosition.x}, ${startPosition.y}) and (${endPosition.x}, ${endPosition.y})`)
        
        // Find Δx and Δy
        let deltaX = Math.abs(endPosition.x - startPosition.x)
        let deltaY = Math.abs(endPosition.y - startPosition.y)

        // Find slope with +1 or -1 to determine next pixel
        let slopeX = (startPosition.x < endPosition.x) ? 1 : -1
        let slopeY = (startPosition.y < endPosition.y) ? 1 : -1

        let deltaError = deltaX - deltaY
        
        while(true) {
            context.fillStyle = colorToCanvasColor(color)
            context.fillRect(startPosition.x, startPosition.y, 1, 1)
            if (startPosition.x === endPosition.x && startPosition.y === endPosition.y) break

            // 
            let e2 = 2*deltaError
            if (e2 > -deltaY) { deltaError -= deltaY; startPosition.x += slopeX; }
            if (e2 < deltaX) { deltaError += deltaX; startPosition.y += slopeY; }
        }
    }

    mouseDown(context, x, y, color) {
        if (!this.isDrawing()) {
            // Set initial position of the line
            this.startPosition = {x, y}
        }
        else {
            // Draw the line from initial position to end position
            this.plotLine(context, this.startPosition, {x, y}, color)
            this.startPosition = null
        }
    }
}

export default new Lines()