import { useBrushColor } from "../../../../../hooks/useBrushColor"
import {colorToCanvasColor} from "../../../../../core/utils/colors"

import colorPicker from "../../../../../core/options/ColorPicker"


import "./ColorPickerMenu.css"
import { useActiveTool } from "../../../../../hooks/useActiveTool"

export default function ColorPickerMenu() {
    const {brushColor} = useBrushColor()

    const {activeTool, setActiveTool} = useActiveTool()

    const useColorPicker = function() {
        setActiveTool(colorPicker)
    }

    const render = function() {
        return (
            <div className="ColorPickerMenu">
                <button className={activeTool === colorPicker ? "active" : ""} onClick={useColorPicker}>{colorPicker.renderIcon()}</button>
                <div className="colorPickerDisplay" style={{background: colorToCanvasColor(brushColor)}}/>
            </div>
        )
    }
    return render()
}