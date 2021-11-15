import React from "react"
import "./ToolBox.css"
import pixel from "../../tools/Pixel.js"
import lines from "../../tools/Lines.js"
import shapes from "../../tools/Shapes.js"
import fill from "../../tools/Fill.js"
import picker from "../../tools/Picker.js"
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
            {tool.name}
        </button>
    }

    const tools = [pixel, lines, shapes, fill, picker, erase]

    const render = function() {
        return (
            <div className="toolBox">
                <div className="toolBar">
                    <div className="toolBarTitle">Tools</div>
                    {tools.map(renderToolButton)}
                </div>
                <div className="toolOptions">
                    <div className="toolOptionsTitle">Options</div>
                    <div className="colorPicker">
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