import React from "react"
import "./ToolBox.css"
import pixel from "../../core/tools/Pixel.js"
import lines from "../../core/tools/Lines.js"
import shapes from "../../core/tools/Shapes.js"
import fill from "../../core/tools/Fill.js"
import erase from "../../core/tools/Erase"

import {useBrushColor} from "../../hooks/useBrushColor"
import {useActiveTool} from "../../hooks/useActiveTool"

import {ChromePicker} from "react-color"

import {BsGear} from "react-icons/bs"


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
                    <button className="settingsButton"><BsGear/></button>
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