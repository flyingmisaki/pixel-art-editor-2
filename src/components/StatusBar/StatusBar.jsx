import React from "react"
import "./StatusBar.css"

import ColoredSquare from "../common/ColoredSquare/ColoredSquare"

import {useBrushColor} from "../../hooks/useBrushColor"
import {useActiveTool} from "../../hooks/useActiveTool"
import {useLayers} from "../../hooks/useLayers"
import {useCanvasPosition} from "../../hooks/useCanvasPosition"

export default function StatusBar() {
    
    const {activeTool, toolStatus} = useActiveTool()
    const {brushColor} = useBrushColor()
    const {activeLayer} = useLayers()
    const {canvasPosition} = useCanvasPosition()

    const render = function() {
        return (
            <div className="statusBar">
                <p>
                    <span>
                        Color: 
                    </span>
                    <ColoredSquare color={brushColor}/>
                    <span>
                        rgba({brushColor.r}, {brushColor.g}, {brushColor.b}, {brushColor.a})
                        , Active Layer: {activeLayer?.name}
                        , Cursor Position: ({(canvasPosition.x)}, {canvasPosition.y})
                        , Tool:{activeTool.renderIcon()}
                        {activeTool?.name ?? "none"}
                    </span>
                </p>
                <p>
                    {toolStatus}
                </p>
            </div>
        )
    }

    return render()
}