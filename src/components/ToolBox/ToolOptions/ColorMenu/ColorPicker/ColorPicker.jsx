import { BsEyedropper } from "react-icons/bs"
import { useBrushColor } from "../../../../../hooks/useBrushColor"
import {colorToCanvasColor} from "../../../../../core/utils/colors"


import "./ColorPicker.css"

export default function ColorPicker() {
    const {brushColor, setBrushColor} = useBrushColor()

    const useColorPicker = function() {

    }

    const render = function() {
        return (
            <div className="ColorPicker">
                <button className="colorPickerButton" onClick={useColorPicker}><BsEyedropper/></button>
                <div className="colorPickerDisplay" style={{background: colorToCanvasColor(brushColor)}}/>
            </div>
        )
    }
    return render()
}