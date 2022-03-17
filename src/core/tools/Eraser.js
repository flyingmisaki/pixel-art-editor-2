import {BsEraser} from "react-icons/bs"

class Eraser {
    constructor() {
        this.name = "Eraser"
        this.usesColors = false

        this.canvasContext = null
        
        this.options = {
            scale : 1
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
        return <BsEraser/>
    }

    plotLine(context, startPosition, endPosition) {
        if (!context) return
        
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
            this.erasePixel(context, currentPosition)

            // If we have hit the end position, set drawing to false
            drawing = currentPosition.x !== endPosition.x || currentPosition.y !== endPosition.y

            const e2 = 2 * deltaError

            if (e2 > -deltaY) { deltaError -= deltaY; currentPosition.x += slopeX; }
            if (e2 < deltaX) { deltaError += deltaX; currentPosition.y += slopeY; }
        }
    }

    erasePixel(context, position) {
        if (!context) return
        context.clearRect(position.x, position.y, this.options.scale, this.options.scale)
        if (this.drawing) this.updateStatus(`Erasing pixel at ${position.x},${position.y}`)
    }

    mouseDown(position) {
        this.erasePixel(this.canvasContext, position)
        this.drawing = true
    }
    
    mouseUp(position, color) {
        this.drawing = false
    }

    mouseMove(position) {
        const context = this.drawing ? this.canvasContext : this.previewCanvasContext
        this.erasePixel(context, position)

        if (this.drawing) {
            if (this.previousPosition) {
                this.plotLine(context, this.previousPosition, position)
            }
            this.previousPosition = position
        }
    }
}

export default new Eraser()