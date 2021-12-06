import {colorToCanvasColor} from "../utils/colors"
import {BsStar} from "react-icons/bs"

class Shapes {
    constructor() {
        this.name = "Shapes"
        this.usesColors = true

        this.availableShapes = ["Circle", "Triangle", "Rectangle"]
        
        this.previewCanvasContext = null
        this.canvasContext = null
        this.options = {
            scale : 1
        }

        this.shape = "Circle"

        this.startPosition = null
    }

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
        console.log("yoooo")

        let x = -radius, y = 0, err = 2 - 2 * radius                /* bottom left to top right */
        let drawing = true
        while (x < 0) {
            drawing = startPosition.x !== endPosition.x || startPosition.y !== endPosition.y
            context.fillRect(startPosition.x - x, startPosition.y + y, 1, 1)                            /*   I. Quadrant +x +y */
            context.fillRect(startPosition.x - y, startPosition.y - x, 1, 1)                            /*  II. Quadrant -x +y */
            context.fillRect(startPosition.x + x, startPosition.y - y, 1, 1)                            /* III. Quadrant -x -y */
            context.fillRect(startPosition.x + y, startPosition.y + x, 1, 1)                            /*  IV. Quadrant +x -y */
            
            radius = err                                       
            
            if (radius <= y) err += ++y * 2 + 1                                   /* y step */
            if (radius > x || err > y) err += ++x * 2 + 1                        /* x step */
        }
    }

    plotShape(shape, context, startPosition, endPosition, color) {
        switch (shape) {
            case "Circle":
                this.plotCircle(context, startPosition, endPosition, color)
            default: break

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
        console.log(`Line drawn between (${this.startPosition.x}, ${this.startPosition.y}) and (${position.x}, ${position.y})`)
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