import { BsEyedropper } from "react-icons/bs"

class ColorPicker {
    constructor() {
        this.name = "Color Picker"
        this.usesColors = true

        this.canvasContext = null
        this.options = {
            scale : 1
        }
        this.drawing = false

        this.color = null
    }

    updateStatus(status) {
        this.status = status
        this.onStatusChange(status)
    }

    onStatusChange(status) {}

    renderIcon() {
        return <BsEyedropper/>
    }

    getColor(context, position) {
        if (!context) return

        this.color = context.getImageData(position.x, position.y, this.options.scale, this.options.scale)
    }

    mouseDown(position) {
        this.position = position
        this.getColor(this.canvasContext, position)
        this.drawing = true
        if (this.drawing) this.updateStatus(`Getting color data at ${position.x},${position.y}`)
    }
    
    mouseUp(position, color) {
        this.drawing = false
    }

    mouseMove(position) {
        if (this.drawing) this.updateStatus(`Getting color data at ${position.x},${position.y}`)
        const context = this.drawing ? this.canvasContext : this.previewCanvasContext
        this.getColor(context, position)
    }
}

export default new ColorPicker()