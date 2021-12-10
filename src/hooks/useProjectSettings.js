import React, {useState, useContext, createContext, useRef} from "react"

const ProjectSettingsContext = createContext()

export function useProjectSettings() {
    return useContext(ProjectSettingsContext)
}

export function ProjectSettingsProvider(props) {
    const [canvasCursorPosition, setCanvasCursorPosition] = useState({x: null, y: null})
    const previewLayerCanvasRef = useRef(null)
    const [width, setWidth] = useState(16)
    const [height, setHeight] = useState(16)
    const [scale, setScale] = useState(50)

    const projectSettingsData = {
        canvasCursorPosition, setCanvasCursorPosition,
        previewLayerCanvasRef,
        width, setWidth,
        height, setHeight,
        scale, setScale
    }

    return (
        <ProjectSettingsContext.Provider value={projectSettingsData}>
            {props.children}
        </ProjectSettingsContext.Provider>
    )
}