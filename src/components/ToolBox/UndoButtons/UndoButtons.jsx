import React, { useEffect, useRef } from "react"
import "./UndoButtons.css"

import {BsArrowCounterclockwise, BsArrowClockwise} from "react-icons/bs"

import { useHistory } from "../../../hooks/useHistory.js"
import { useLayers } from "../../../hooks/useLayers.js"

import {clearCanvas, copyCanvasContents} from "../../../core/utils/canvas"
import { useProjectSettings } from "../../../hooks/useProjectSettings"

export default function UndoButtons() {
    const {layers} = useLayers()
    const {width, height} = useProjectSettings()

    const {undo, redo} = useHistory()

    const imageCanvasRef = useRef(null)

    const render = function() {
        return (
            <div className="UndoButtons">
                <button className="undoButton" onClick={undo}><BsArrowCounterclockwise/></button>
                <button className="redoButton" onClick={redo}><BsArrowClockwise/></button>
            </div>
        )
    }
    return render()
}