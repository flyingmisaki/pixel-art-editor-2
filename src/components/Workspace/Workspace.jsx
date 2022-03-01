import {React, useEffect, useRef} from "react"
import "./Workspace.css"
import PixelCanvas from "./PixelCanvas/PixelCanvas"
import { useProjectSettings } from "../../hooks/useProjectSettings"
import { useHistory } from "../../hooks/useHistory"
import { useActiveTool } from "../../hooks/useActiveTool"
import Brush from "../../core/tools/Brush"
import Eraser from "../../core/tools/Eraser"
import Line from "../../core/tools/Line"
import ColorPicker from "../../core/tools/ColorPicker"
import Fill from "../../core/tools/Fill"
import Circle from "../../core/tools/Circle"
import Rectangle from "../../core/tools/Rectangle"
import Triangle from "../../core/tools/Triangle"

export default function Workspace() {
    const {setScale} = useProjectSettings()
    const {undo, redo} = useHistory()
    const {setActiveTool} = useActiveTool()

    const workspaceRef = useRef(null)


    // Maybe bring these back locally, makes it a tiny bit laggy?
    const {canvasX, setCanvasX, canvasY, setCanvasY} = useProjectSettings()

    useEffect(() => {
        const handleMouseWheel = function(event) {
            if (event.deltaY < 0) setScale((scale) => scale + 1)
            if (event.deltaY > 0) setScale((scale) => scale - 1)
        }

        const handleMouseMove = function(event) {
            if(!(event.buttons & 2)) return

            setCanvasX((canvasX) => canvasX + event.movementX)
            setCanvasY((canvasY) => canvasY + event.movementY)
        }

        const handleKeys = function(event) {
            event = event || window.event

            const key = event.which || event.keyCode

            const ctrl = event.ctrlKey ? event.ctrlKey : ((key === 17)  ? true : false)
            const shift = event.shiftKey ? event.shiftKey : ((key === 16)  ? true : false)
            
            if (ctrl && !shift && key === 90) {
                undo()
                return
            }
            if ((ctrl && key === 89) || (ctrl && shift && key === 90)) {
                redo()
                return
            }

            switch (key) {
                case 49 || 96:
                    setActiveTool(Brush)
                    break
                case 50 || 97:
                    setActiveTool(Eraser)
                    break
                case 51 || 98:
                    setActiveTool(Line)
                    break
                case 52 || 99:
                    setActiveTool(Triangle)
                    break 
                case 53 || 100:
                    setActiveTool(Rectangle)
                    break
                case 54 || 101:
                    setActiveTool(Circle)
                    break
                case 55 || 102:
                    setActiveTool(Fill)
                    break
                case 56 || 103:
                    setActiveTool(ColorPicker)
                    break
                default :
                    break
            }

        }

        if (!workspaceRef.current) return
        const workspaceElement = workspaceRef.current

        workspaceElement.addEventListener("wheel", handleMouseWheel)
        workspaceElement.addEventListener("mousemove", handleMouseMove)
        
        document.addEventListener("keydown", handleKeys)

        return () => {
            workspaceElement.removeEventListener("wheel", handleMouseWheel)
            workspaceElement.removeEventListener("mousemove", handleMouseMove)

            document.removeEventListener("keydown", handleKeys)
        }
    }, [workspaceRef, setScale, setCanvasX, setCanvasY, undo, redo, setActiveTool])

    const render = function() {
        return (
            <div className="workspace" id="workspace" ref={workspaceRef}>
                <div style={{
                    position: "relative",
                    left: canvasX,
                    top: canvasY
                }}>
                    <PixelCanvas/>
                </div>
            </div>
        )
    }

    return render()
}