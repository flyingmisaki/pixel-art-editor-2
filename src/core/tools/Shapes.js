import {colorToCanvasColor} from "../utils/colors"
import {BsStar} from "react-icons/bs"

class Shapes {
    constructor() {
        this.name = "Shapes"
        this.usesColors = true
        this.status = ""

        this.availableShapes = ["Circle", "Triangle", "Rectangle"]
        
        this.previewCanvasContext = null
        this.canvasContext = null
        this.options = {
            scale : 1
        }

        this.shape = "Circle"

        this.startPosition = null
        this.radius = null
    }

    updateStatus(status) {
        this.status = status
        this.onStatusChange(status)
    }

    onStatusChange(status) {}

    renderIcon() {
        return <BsStar/>
    }

    isDrawing() {
        return !!this.startPosition
    }

    plotCircle(context, startPosition, endPosition, color) {
        if (!context) return
        
        context.fillStyle = colorToCanvasColor(color)

        let radius = Math.abs(this.startPosition.x - endPosition.x)

        let x = -radius, y = 0, err = 2 - 2 * radius                /* bottom left to top right */

        while (x < 0) {
            
            context.fillRect(startPosition.x - x, startPosition.y + y, this.options.scale, this.options.scale)                            /*   I. Quadrant +x +y */
            context.fillRect(startPosition.x - y, startPosition.y - x, this.options.scale, this.options.scale)                            /*  II. Quadrant -x +y */
            context.fillRect(startPosition.x + x, startPosition.y - y, this.options.scale, this.options.scale)                            /* III. Quadrant -x -y */
            context.fillRect(startPosition.x + y, startPosition.y + x, this.options.scale, this.options.scale)                            /*  IV. Quadrant +x -y */
            
            radius = err                                       
            
            if (radius <= y) err += ++y * 2 + 1                                   /* y step */
            if (radius > x || err > y) err += ++x * 2 + 1                        /* x step */
            this.radius = radius
        }
    }

    plotShape(shape, context, startPosition, endPosition, color) {
        switch (shape) {
            case "Circle":
                this.plotCircle(context, startPosition, endPosition, color)
                break
            default:
                return
        }
    }

    drawPixel(context, position, color) {
        if (!context) return
        context.fillStyle = colorToCanvasColor(color)
        // Clears before placing color again so it doesn't add up with transparency ect...
        context.fillRect(position.x, position.y, this.options.scale, this.options.scale)
    }

    toggleShape(availableShapes, shape) {
        this.shape = availableShapes[+1]
    }

    mouseDown(position) {
        this.startPosition = position
    }

    mouseUp(position, color) {
        // Draw the line from initial position to end position
        this.plotShape(this.shape, this.canvasContext, this.startPosition, position, color)
        this.updateStatus(`Circle drawn at (${this.startPosition.x}, ${this.startPosition.y})`) //with radius of ${this.radius}
        this.startPosition = null
    }

    mouseMove(position, color) {
        if (this.isDrawing()) {
            this.plotShape(this.shape, this.previewCanvasContext, this.startPosition, position, color)
        }
        else {
            const context = this.previewCanvasContext
            this.drawPixel(context, position, color)
        }
    }
}

export default new Shapes()