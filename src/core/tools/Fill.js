import {colorsEqual, colorToCanvasColor} from "../utils/colors"
import {BsPaintBucket} from "react-icons/bs"

class Fill {
    constructor(maxWidth, maxHeight) {
        this.name = "Fill"
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
        return <BsPaintBucket/>
    }

    floodFill(position, oldColor, newColor) {

        if (colorsEqual(this.getColor(position), oldColor)) {
            if (position.x < 0 || position.y < 0 || position.x > this.canvasContext.canvas.width - 1 || position.y > this.canvasContext.canvas.height - 1 || oldColor === undefined) return

            this.drawPixel(this.canvasContext, position, newColor)
            
            const {x, y} = position
            const adjacentPositions = [
                {x : x + 1, y},
                {x : x - 1, y},
                {x, y : y + 1},
                {x, y : y - 1}
            ]

            adjacentPositions.forEach((adjacentPosition) => {
                this.floodFill(adjacentPosition, oldColor, newColor)
            })
        }
    }

    getColor(position) {
        const pixelData = this.canvasContext.getImageData(position.x, position.y, 1, 1)
        const [r, g, b, a] = pixelData.data
        return {
            r,
            g,
            b,
            a: a/255
        }
    }

    drawPixel(context, position, color) {
        if (!context) return
        context.fillStyle = colorToCanvasColor(color)
        // Clears before placing color again so it doesn't add up with transparency ect...
        context.fillRect(position.x, position.y, this.options.scale, this.options.scale)
    }

    mouseDown(position, color, maxWidth, maxHeight) {
        this.position = position

        this.floodFill(position, this.getColor(position), color, maxWidth, maxHeight)

        this.drawing = true
        // if (this.drawing) this.updateStatus(`Drawing pixel at ${position.x}, ${position.y}`)
    }

    mouseUp(position, color) {
        this.drawing = false
    }

    mouseMove(position, color) {
        // if (this.drawing) this.updateStatus(`Drawing pixel at ${position.x}, ${position.y}`)
        // const context = this.drawing ? this.canvasContext : this.previewCanvasContext
        // this.drawPixel(context, position, color)
    }
}

export default new Fill()