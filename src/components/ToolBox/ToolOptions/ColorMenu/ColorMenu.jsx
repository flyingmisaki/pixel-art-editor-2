import React from "react"
import "./ColorMenu.css"

import OptionWindow from "../../../common/OptionWindow/OptionWindow"
import ColorPicker from "../../../../core/tools/ColorPicker"
import { ChromePicker } from "react-color"

import {useBrushColor} from "../../../../hooks/useBrushColor"
import { useActiveTool } from "../../../../hooks/useActiveTool"

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
