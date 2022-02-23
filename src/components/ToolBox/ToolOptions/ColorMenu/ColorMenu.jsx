import React from "react"
import {useBrushColor} from "../../../../hooks/useBrushColor"
import "./ColorMenu.css"
import OptionWindow from "../../../common/OptionWindow/OptionWindow"
import { ChromePicker } from "react-color"

export default function ColorMenu() {
    const {brushColor, setBrushColor} = useBrushColor()

    const render = function() {
        return (
            <OptionWindow title="Color">
                <ChromePicker
                    color={brushColor}
                    onChange={(color) => setBrushColor(color.rgb)}
                />
            </OptionWindow>
        )
    }
    return render()
}
