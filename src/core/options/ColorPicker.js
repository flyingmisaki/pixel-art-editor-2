import { BsEyedropper } from "react-icons/bs"
import ColoredSquare from "../../components/common/ColoredSquare/ColoredSquare"

class ColorPicker {
    constructor() {
        this.name = "Color Picker"
        this.usesColors = false

        this.canvasContext = null
        this.options = {
            scale : 1
        }
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

    mouseDown(position) {
        this.position = position
        this.color = this.getColor(position)
    }
    
    mouseUp(position, color) {}

    mouseMove(position) {
        const color = this.getColor(position)
        this.color = color
        const status = (
            <>
                Getting color data at ({position.x}, {position.y}), <ColoredSquare color={color}/>rgba({color.r}, {color.g}, {color.b}, {color.a})
            </>
        )
        this.updateStatus(status)
    }
}

export default new ColorPicker()