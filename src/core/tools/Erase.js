import {BsEraser} from "react-icons/bs"

class Erase {
    constructor() {
        this.name = "Erase"
        this.usesColors = false

        this.canvasContext = null
        this.options = {
            scale : 1
        }
        this.drawing = false
    }

    updateStatus(status) {
        this.status = status
        this.onStatusChange(status)
    }

    onStatusChange(status) {}

    renderIcon() {
        return <BsEraser/>
    }

    erasePixel(context, position) {
        if (!context) return
        context.clearRect(position.x, position.y, this.options.scale, this.options.scale)
    }

    mouseDown(position) {
        this.position = position
        this.erasePixel(this.canvasContext, position)
        this.drawing = true
        if (this.drawing) this.updateStatus(`Erasing pixel at ${position.x},${position.y}`)
    }
    
    mouseUp(position, color) {
        this.drawing = false
    }

    mouseMove(position) {
        if (this.drawing) this.updateStatus(`Erasing pixel at ${position.x},${position.y}`)
        const context = this.drawing ? this.canvasContext : this.previewCanvasContext
        this.erasePixel(context, position)
    }
}

export default new Erase()