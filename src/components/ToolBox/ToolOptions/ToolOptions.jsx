import React from "react"
import {ChromePicker} from "react-color"
import {useBrushColor} from "../../../hooks/useBrushColor"
import "./ToolOptions.css"
import {colorToCanvasColor} from "../../../core/utils/colors"
import OptionWindow from "../../common/OptionWindow/OptionWindow"

export default function ToolOptions() {
    const {brushColor, setBrushColor, colorHistory} = useBrushColor()

    const renderRecentColor = function(color) {
        const isActive = color === brushColor
        const className = isActive ? "selected" : null
        return (
            <div className="colorButtonContainer">
                <button 
                    style={{background: colorToCanvasColor(color)}}
                    onClick={() => setBrushColor(color)}
                    className={className}
                />
            </div>
        )
    }

    const render = function() {
        return (
            <div className="toolOptions">
                <OptionWindow title="Color">
                    <ChromePicker
                        color={brushColor}
                        onChange={(color) => setBrushColor(color.rgb)}
                    />
                </OptionWindow>
                <OptionWindow title="Recent Colors">
                    <div className="recentColors">
                        {colorHistory.map(renderRecentColor)}
                    </div>
                </OptionWindow>
                <OptionWindow title="Stroke Options">
                    <div>
                        STROKE OPTIONS!
                    </div>
                </OptionWindow>
            </div>
        )
    }

    return render()
}