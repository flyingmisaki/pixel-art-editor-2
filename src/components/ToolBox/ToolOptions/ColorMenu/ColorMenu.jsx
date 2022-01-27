import React from "react"
import {useBrushColor} from "../../../../hooks/useBrushColor"
import "./ColorMenu.css"
import OptionWindow from "../../../common/OptionWindow/OptionWindow"
import { ChromePicker } from "react-color"
import ColorPickerMenu from "./ColorPicker/ColorPickerMenu"

export default function ColorMenu() {
    const {brushColor, setBrushColor} = useBrushColor()

    const render = function() {
        return (
            <OptionWindow title="Color">
                <ChromePicker
                    color={brushColor}
                    onChange={(color) => setBrushColor(color.rgb)}
                />
                <ColorPickerMenu/>
            </OptionWindow>
        )
    }
    return render()
}
