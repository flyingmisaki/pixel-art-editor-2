import React from "react"
import {useBrushColor} from "../../../../hooks/useBrushColor"
import "./RecentColors.css"
import {colorToCanvasColor} from "../../../../core/utils/colors"
import OptionWindow from "../../../common/OptionWindow/OptionWindow"

export default function RecentColors() {
    const {brushColor, setBrushColor, colorHistory} = useBrushColor()

    const renderRecentColor = function(color, index) {
        const isActive = color === brushColor
        const className = isActive ? "selected" : null
        return (
            <div className="colorButtonContainer" key={index}>
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
            <OptionWindow title="Recent Colors">
                <div className="recentColors">
                    {colorHistory.map(renderRecentColor)}
                </div>
            </OptionWindow>
        )
    }
    return render()
}
