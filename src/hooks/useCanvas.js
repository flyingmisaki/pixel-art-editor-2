import React, {useState, useContext, createContext} from "react"

const CanvasContext = createContext()

export function useCanvas() {
    return useContext(CanvasContext)
}

export function CanvasProvider(props) {
    const [canvasCursorPosition, setCanvasCursorPosition] = useState({x: null, y: null})
    const [previewLayerCanvasRef, setpreviewLayerCanvasRef] = useState(null)
    const [width, setWidth] = useState(16)
    const [height, setHeight] = useState(16)
    const [scale, setScale] = useState(50)

    const canvasData = {
        canvasCursorPosition, setCanvasCursorPosition,
        previewLayerCanvasRef, setpreviewLayerCanvasRef,
        width, setWidth,
        height, setHeight,
        scale, setScale
    }

    return (
        <CanvasContext.Provider value={canvasData}>
            {props.children}
        </CanvasContext.Provider>
    )
}