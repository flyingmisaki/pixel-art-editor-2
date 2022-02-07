import {React, useEffect, useRef} from "react"
import "./Workspace.css"
import PixelCanvas from "./PixelCanvas/PixelCanvas"
import { useProjectSettings } from "../../hooks/useProjectSettings"

export default function Workspace() {
    const {setScale} = useProjectSettings()

    const workspaceRef = useRef(null)
    
    const offsetX = 0
    const offsetY = 0

    useEffect(() => {
        if (!workspaceRef.current) return
        const workspaceElement = workspaceRef.current

        const handleMouseWheel = function(event) {
            if (event.deltaY < 0) setScale((scale) => scale + 1)
            if (event.deltaY > 0) setScale((scale) => scale - 1)
        }

        const handleMouseDown = function() {

        }

        const handleMouseUp = function() {
            
        }

        const handleMouseMove = function() {
            
        }

        workspaceElement.addEventListener("wheel", handleMouseWheel)

        workspaceElement.addEventListener("mousedown", handleMouseDown)
        workspaceElement.addEventListener("mouseup", handleMouseUp)
        workspaceElement.addEventListener("mousemove", handleMouseMove)

        return () => {
            workspaceElement.removeEventListener("wheel", handleMouseWheel)
            
            workspaceElement.removeEventListener("mousedown", handleMouseDown)
            workspaceElement.removeEventListener("mouseup", handleMouseUp)
            workspaceElement.removeEventListener("mousemove", handleMouseMove)
        }
    }, [workspaceRef, setScale])

    const render = function() {
        return (
            <div className="workspace" id="workspace" ref={workspaceRef}>
                <div style={{}}>
                    <PixelCanvas/>
                </div>
            </div>
        )
    }

    return render()
}