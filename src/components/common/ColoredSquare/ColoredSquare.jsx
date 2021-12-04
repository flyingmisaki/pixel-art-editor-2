import React from "react"
import "./ColoredSquare.css"

import { colorToCanvasColor } from "../../../core/utils/colors"

export default function ColoredSquare(props) {
    const color = props.color
    
    const render = function() {
        return (
            <span className="coloredSquare" style={{background: colorToCanvasColor(color)}}/>
        )
    }

    return render()
}

