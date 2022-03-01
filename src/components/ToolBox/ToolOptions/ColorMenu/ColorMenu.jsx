import React from "react"
import {useBrushColor} from "../../../../hooks/useBrushColor"
import "./ColorMenu.css"
import OptionWindow from "../../../common/OptionWindow/OptionWindow"
import { ChromePicker } from "react-color"
import { useActiveTool } from "../../../../hooks/useActiveTool"
import ColorPicker from "../../../../core/tools/ColorPicker"

export default function ColorMenu() {
    const {activeTool} = useActiveTool()
    const {brushColor, setBrushColor, colorPickerColor} = useBrushColor()

    const renderColorPicker = function () {
        return (
            <ChromePicker
                color={activeTool === ColorPicker ? colorPickerColor : brushColor}
                onChange={(color) => setBrushColor(color.rgb)}
            />
        )
    }

    const render = function() {
        return (
            <OptionWindow title="Color">
                {renderColorPicker()}
            </OptionWindow>
        )
    }
    return render()
}
