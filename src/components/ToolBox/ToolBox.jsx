import React from "react"
import "./ToolBox.css"
import Brush from "../../core/tools/Brush.js"
import Line from "../../core/tools/Line.js"
import Rectangle from "../../core/tools/Rectangle"
import Circle from "../../core/tools/Circle.js"
import Fill from "../../core/tools/Fill.js"
import Eraser from "../../core/tools/Eraser.js"
import Triangle from "../../core/tools/Triangle"
import ColorPicker from "../../core/tools/ColorPicker.js"

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
                <div className="number">{tools.indexOf(tool) + 1}</div>
            </button>
        )
    }
    
    const tools = [Brush, Eraser, Line, Triangle, Rectangle, Circle, Fill]

    const useColorPicker = function() {
        setActiveTool(ColorPicker)
    }

    const renderColorPicker = function() {
        const active = activeTool === ColorPicker
        return (
            <button className={`ColorPickerButton ${active ? "active" : ""}`} onClick={useColorPicker}>
                <div className="colorPickerInner" style={active ? {background: colorPickerColor} : {}}>
                    {ColorPicker.renderIcon()}
                    <div className="number">8</div>
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