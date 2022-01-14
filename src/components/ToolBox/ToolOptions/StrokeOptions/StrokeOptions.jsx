import React from "react"
import "./StrokeOptions.css"
import OptionWindow from "../../../common/OptionWindow/OptionWindow"

import {useActiveTool} from "../../../../hooks/useActiveTool"

export default function StrokeOptions() {
    const {scale, setScale} = useActiveTool()

    const renderStrokeOption = function() {
        return (
            <div className="option">
                <input type="number" id="scale" className="scaleInput" value={scale} onChange={(event) => setScale(event.target.value)}/>
                <label htmlFor="scale" className="scaleLabel">Scale: </label>
            </div>
        )
    }

    const render = function() {
        return (
            <OptionWindow title="Stroke Options">
                <div className="strokeOptions">
                    {renderStrokeOption()}
                </div>
            </OptionWindow>
        )
    }
    return render()
}
