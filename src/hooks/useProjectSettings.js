import React, { useState, useContext, createContext, useRef } from "react"

const ProjectSettingsContext = createContext()

export function useProjectSettings() {
    return useContext(ProjectSettingsContext)
}

export function ProjectSettingsProvider(props) {
    const [canvasCursorPosition, setCanvasCursorPosition] = useState({x: null, y: null})
    const previewLayerCanvasRef = useRef(null)
    const [width, setWidth] = useState(32)
    const [height, setHeight] = useState(32)
    const [scale, setScale] = useState(25)
    const [canvasX, setCanvasX] = useState(0)
    const [canvasY, setCanvasY] = useState(0)

    const projectSettingsData = {
        canvasCursorPosition, setCanvasCursorPosition,
        previewLayerCanvasRef,
        width, setWidth,
        height, setHeight,
        scale, setScale,
        canvasX, setCanvasX,
        canvasY, setCanvasY
    }

    return (
        <ProjectSettingsContext.Provider value={projectSettingsData}>
            {props.children}
        </ProjectSettingsContext.Provider>
    )
}