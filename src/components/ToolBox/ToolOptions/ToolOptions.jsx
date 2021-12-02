import React from "react"
import {ChromePicker} from "react-color"


// import {useActiveTool} from "../../../hooks/useActiveTool"
import {useBrushColor} from "../../../hooks/useBrushColor"
import "./ToolOptions.css"

export default function ToolBox() {

    const [brushColor, setBrushColor] = useBrushColor()
    
    // const [activeTool] = useActiveTool()

    // const renderOption = function(option) {

    // }

    const render = function() {
        return (
            <div className="toolOptions">
                <div className="option">
                    <div className="optionTitle">Color</div>
                    <ChromePicker
                        color={brushColor}
                        onChangeComplete={(color) => setBrushColor(color.rgb)}
                    ></ChromePicker>
                </div>
                <div className="option">
                    <div className="optionTitle">Stroke Options</div>
                    

                </div>
            </div>
        )
    }

    return render()
}