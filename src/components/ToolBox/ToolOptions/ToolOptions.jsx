import React from "react"
import "./ToolOptions.css"

import ColorMenu from "./ColorMenu/ColorMenu"
import RecentColors from "./RecentColors/RecentColors"
import StrokeOptions from "./StrokeOptions/StrokeOptions"

export default function ToolOptions() {
    const render = function() {
        return (
            <div className="toolOptions">
                <StrokeOptions/>
                <ColorMenu/>
                <RecentColors/>
            </div>
        )
    }

    return render()
}