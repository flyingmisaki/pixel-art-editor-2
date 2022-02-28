import React from "react"
import "./ToolBox.css"
import Brush from "../../core/tools/Brush.js"
import lines from "../../core/tools/Lines.js"
import shapes from "../../core/tools/Shapes.js"
import fill from "../../core/tools/Fill.js"
import erase from "../../core/tools/Erase.js"
import colorPicker from "../../core/options/ColorPicker.js"

import UndoButtons from "./UndoButtons/UndoButtons"

import ToolOptions from "./ToolOptions/ToolOptions"

import {useActiveTool} from "../../hooks/useActiveTool"
import { useBrushColor } from "../../hooks/useBrushColor"

export default function ToolBox() {

    const {activeTool, setActiveTool} = useActiveTool()
    const {colorPickerColor} = useBrushColor()


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
    
    const tools = [Brush, lines, shapes, fill, erase]

    const useColorPicker = function() {
        setActiveTool(colorPicker)
    }

    const renderColorPicker = function() {
        const active = activeTool === colorPicker
        return (
            <button className={`ColorPickerButton ${active ? "active" : ""}`} onClick={useColorPicker}>
                <div className="colorPickerInner" style={active ? {background: colorPickerColor} : {}}>
                    {colorPicker.renderIcon()}
                </div>
            </button>
        )
    }

    const render = function() {
        return (
            <div className="toolBox">
                <div className="toolBar">
                    {/* Iterates tool obj list and renders for each */}
                    {tools.map(renderToolButton)}
                    {renderColorPicker()}
                    <UndoButtons/>
                </div>
                <ToolOptions/>
            </div>
        )
    }
    return render()
}