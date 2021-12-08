import React from "react"
import "./StrokeOptions.css"
import OptionWindow from "../../../common/OptionWindow/OptionWindow"

export default function StrokeOptions() {
    const render = function() {
        return (
            <OptionWindow title="Stroke Options">
                <div className="strokeOptions">
                    STROKE OPTIONS!
                </div>
            </OptionWindow>
        )
    }
    return render()
}
