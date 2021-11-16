import React from "react"
import "./ToolBox.css"
import pixel from "../../tools/Pixel.js"
import lines from "../../tools/Lines.js"
import shapes from "../../tools/Shapes.js"
import fill from "../../tools/Fill.js"
import erase from "../../tools/Erase"

import {useBrushColor} from "../../hooks/useBrushColor"
import {useActiveTool} from "../../hooks/useActiveTool"

import { ChromePicker } from "react-color"


export default function ToolBox(props) {

    const [brushColor, setBrushColor] = useBrushColor()
    const [activeTool, setActiveTool] = useActiveTool()

    const renderToolButton = function(tool) {
        // Check active tool and tell it its active
        return <button
            className={tool === activeTool ? "active" : ""}
            onClick={() => setActiveTool(tool)}
        >
            {tool.renderIcon()}
        </button>
    }

    const tools = [pixel, lines, shapes, fill, erase]

    const render = function() {
        return (
            <div className="toolBox">
                <div className="toolBar">
                    {/* Iterates tool obj list and renders for each */}
                    {tools.map(renderToolButton)}
                </div>
                <div className="toolOptions">
                    <div className="colorPicker">
                        <div className="optionTitle">Color</div>
						<ChromePicker
							color={brushColor}
							onChangeComplete={(color) => setBrushColor(color.rgb)}
						></ChromePicker>
					</div>
                </div>
            </div>
        )
    }

    return render()
}