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

    renderIcon() {
        return <BsEraser/>
    }

    erasePixel(context, position) {
        console.log(`Erasing pixel at ${position.x},${position.y}`)
        context.clearRect(position.x, position.y, this.options.scale, this.options.scale)
    }

    mouseDown(position) {
        this.position = position
    }
    
    mouseUp(position, color) {
        this.erasePixel(this.canvasContext, position, color)
    }
}

export default new Erase()