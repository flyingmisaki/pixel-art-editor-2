import colorPicker from "../../../../../core/options/ColorPicker"
import "./ColorPickerMenu.css"
import { useActiveTool } from "../../../../../hooks/useActiveTool"
import { useBrushColor } from "../../../../../hooks/useBrushColor"

export default function ColorPickerMenu() {
    const {activeTool, setActiveTool} = useActiveTool()
    const {colorPickerColor} = useBrushColor()

    const useColorPicker = function() {
        setActiveTool(colorPicker)
    }

    const renderColorPickerDisplay = function() {
        return (
            <div className="colorPickerDisplayContainer">
                <div className="colorPickerDisplay" style={{background: colorPickerColor}}/>
            </div>
        ) 
    }

    const render = function() {
        return (
            <div className="ColorPickerMenu">
                <button className={activeTool === colorPicker ? "active" : ""} onClick={useColorPicker}>{colorPicker.renderIcon()}</button>
                {renderColorPickerDisplay()}
            </div>
        )
    }
    return render()
}