import {BsEraser} from "react-icons/bs"

class Erase {
    constructor() {
        this.name = "Erase"
        this.usesColors = false

        this.canvasContext = null
        this.options = {
            scale : 1
        }
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
        this.updateStatus(`Erasing pixel at ${position.x},${position.y}`)
        context.clearRect(position.x, position.y, this.options.scale, this.options.scale)
    }

    mouseDown(position) {
        this.position = position
    }
    
    mouseUp(position, color) {
        this.erasePixel(this.canvasContext, position, color)
    }

    mouseMove(position) {
        
    }
}

export default new Erase()