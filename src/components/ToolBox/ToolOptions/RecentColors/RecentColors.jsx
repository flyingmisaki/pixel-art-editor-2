import React from "react"
import "./RecentColors.css"

import OptionWindow from "../../../common/OptionWindow/OptionWindow"

import {colorsEqual, colorToCanvasColor} from "../../../../core/utils/colors"

import {useBrushColor} from "../../../../hooks/useBrushColor"

export default function RecentColors() {
    const {brushColor, setBrushColor, colorHistory} = useBrushColor()

    const renderRecentColor = function(color, index) {
        const isActive = colorsEqual(brushColor, color)
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
