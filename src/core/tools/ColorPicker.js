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

        this.color = {
            r:0,
            g:0,
            b:0,
            a:0
        }
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
        this.color = this.getColor(position)
        const status = (
            <>
                Getting color data at ({position.x}, {position.y}), <ColoredSquare color={this.color}/>rgba({this.color.r}, {this.color.g}, {this.color.b}, {this.color.a})
            </>
        )
        this.updateStatus(status)
    }
}

export default new ColorPicker()