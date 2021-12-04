import React from "react"
import "./StatusBar.css"

import {colorToHexColor} from "../../core/utils/colors"

import ColoredSquare from "../common/ColoredSquare/ColoredSquare"

import {useBrushColor} from "../../hooks/useBrushColor"
import {useActiveTool} from "../../hooks/useActiveTool"

export default function NavBar() {
    
    const [activeTool] = useActiveTool()
    const {brushColor} = useBrushColor()

    const render = function() {
        return (
            <div className="statusBar">
                <p>
                    <span>
                        Color: 
                    </span>
                    <ColoredSquare color={brushColor}/>
                    <span>
                        {colorToHexColor(brushColor)}
                        , Cursor x, y: {"X"}, {"Y"}
                        , Tool:{activeTool.renderIcon()}
                        {activeTool?.name ?? "none"}
                    </span>
                </p>
            </div>
        )
    }

    return render()
}