import { BsEyedropper } from "react-icons/bs"

class ColorPicker {
    constructor() {
        this.name = "Color Picker"
        this.usesColors = false

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
        const pixelData = context.getImageData(position.x, position.y, 1, 1)
        const [r, g, b, a] = pixelData.data
        this.color = {
            r,
            g,
            b,
            a: a/255
        }
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
        this.getColor(this.canvasContext, position)
        if (this.drawing) this.updateStatus(`Getting color data at ${position.x},${position.y}`)
        // const context = this.drawing ? this.canvasContext : this.previewCanvasContext
    }
}

export default new ColorPicker()