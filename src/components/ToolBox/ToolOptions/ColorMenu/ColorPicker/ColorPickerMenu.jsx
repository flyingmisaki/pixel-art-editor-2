import { BsEyedropper } from "react-icons/bs"
import { useBrushColor } from "../../../../../hooks/useBrushColor"
import {colorToCanvasColor} from "../../../../../core/utils/colors"
import { useLayers } from "../../../../../hooks/useLayers"

import ColorPicker from "../../../../../core/options/ColorPicker"


import "./ColorPickerMenu.css"
import { useActiveTool } from "../../../../../hooks/useActiveTool"

export default function ColorPickerMenu() {
    const {brushColor, setBrushColor} = useBrushColor()

    const {activeLayer} = useLayers()
    const {activeTool, setActiveTool} = useActiveTool()

    const useColorPicker = function() {
        setActiveTool(ColorPicker)

        const color = ColorPicker.color
        console.log(color)
        
        setBrushColor(color)
    }

    const render = function() {
        return (
            <div className="ColorPicker">
                <button className="colorPickerButton" onClick={() => useColorPicker}><BsEyedropper/></button>
                <div className="colorPickerDisplay" style={{background: colorToCanvasColor(brushColor)}}/>
            </div>
        )
    }
    return render()
}