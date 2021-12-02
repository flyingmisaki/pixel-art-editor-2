import React from "react"
import "./ToolBox.css"
import pixel from "../../core/tools/Pixel.js"
import lines from "../../core/tools/Lines.js"
import shapes from "../../core/tools/Shapes.js"
import fill from "../../core/tools/Fill.js"
import erase from "../../core/tools/Erase"

import ToolOptions from "./ToolOptions/ToolOptions"

import {useActiveTool} from "../../hooks/useActiveTool"

import {BsGear} from "react-icons/bs"

export default function ToolBox() {

    const [activeTool, setActiveTool] = useActiveTool()

    const renderToolButton = function(tool) {
        // Check active tool and tell it its active
        return (
            <button
                key={tool.name}
                className={tool === activeTool ? "active" : ""}
                onClick={() => setActiveTool(tool)}
            >
                {tool.renderIcon()}
            </button>
        )
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
                <ToolOptions/>
            </div>
        )
    }

    return render()
}