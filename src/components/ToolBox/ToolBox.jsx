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
        return (
            <div className="ColorPickerMenu">
                <button className={activeTool === colorPicker ? "activePicker" : "inactivePicker"} onClick={useColorPicker} style={{background: colorPickerColor}}>
                    {colorPicker.renderIcon()}
                </button>
            </div>
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