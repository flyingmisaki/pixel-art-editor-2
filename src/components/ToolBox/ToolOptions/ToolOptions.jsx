import React from "react"
import {ChromePicker} from "react-color"

import {useBrushColor} from "../../../hooks/useBrushColor"
import "./ToolOptions.css"

export default function ToolBox() {

    const [brushColor, setBrushColor] = useBrushColor()

    const render = function() {
        return (
            <div className="toolOptions">
                <div className="colorPicker">
                    <div className="optionTitle">Color</div>
                    <ChromePicker
                        color={brushColor}
                        onChangeComplete={(color) => setBrushColor(color.rgb)}
                    ></ChromePicker>
                </div>
            </div>
        )
    }

    return render()
}