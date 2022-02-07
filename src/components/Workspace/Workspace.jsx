import {React, useEffect, useRef, useState} from "react"
import "./Workspace.css"
import PixelCanvas from "./PixelCanvas/PixelCanvas"
import { useProjectSettings } from "../../hooks/useProjectSettings"

export default function Workspace() {
    const {setScale} = useProjectSettings()

    const workspaceRef = useRef(null)

    const [canvasX, setCanvasX] = useState(0)
    const [canvasY, setCanvasY] = useState(0)

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

        if (!workspaceRef.current) return
        const workspaceElement = workspaceRef.current

        workspaceElement.addEventListener("wheel", handleMouseWheel)

        workspaceElement.addEventListener("mousemove", handleMouseMove)

        return () => {
            workspaceElement.removeEventListener("wheel", handleMouseWheel)
            
            workspaceElement.removeEventListener("mousemove", handleMouseMove)
        }
    }, [workspaceRef, setScale])

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