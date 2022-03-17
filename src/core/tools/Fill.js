import {colorsEqual, colorToCanvasColor} from "../utils/colors"
import {BsPaintBucket} from "react-icons/bs"

class Fill {
    constructor(maxWidth, maxHeight) {
        this.name = "Flood Fill"
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
            if (position.x < 0 || position.y < 0 || position.x > this.canvasContext.canvas.width - 1 || position.y > this.canvasContext.canvas.height - 1) return

            // Fill in the current pixel
            this.drawPixel(this.canvasContext, position, newColor)

            if (colorsEqual(this.getColor(position), oldColor)) return
            
            // Calculate all adjacent positions
            const {x, y} = position
            const adjacentPositions = [
                {x : x + 1, y},
                {x : x - 1, y},
                {x, y : y + 1},
                {x, y : y - 1}
            ]

            // Rescurisvely call floodFill to fill in all adjacent positions
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
        this.drawing = true
        if (this.drawing) this.updateStatus(`Flood filling from ${position.x}, ${position.y}`)
    }

    mouseUp(position, color, maxWidth, maxHeight) {
        this.drawing = false
        const colorToBeFilled = this.getColor(position)
        if (colorsEqual(colorToBeFilled, color)) return
        this.floodFill(position, colorToBeFilled, color, maxWidth, maxHeight)
    }

    mouseMove(position, color) {}
}

export default new Fill()