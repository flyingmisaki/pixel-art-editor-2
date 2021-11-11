import React from "react"
import "./StatusBar.css"

import {colorToHexColor} from "../../utils/colors"

import {useBrushColor} from "../../hooks/useBrushColor"
import {useActiveTool} from "../../hooks/useActiveTool"

export default function NavBar() {
    
    const [activeTool] = useActiveTool()
    const [brushColor] = useBrushColor()

    const render = function() {
        return (
            <a>Tool: {activeTool?.name ?? "none"}, Color: {colorToHexColor(brushColor)}, Cursor x, y: {}, {}</a>
        )
    }

    return render()
}