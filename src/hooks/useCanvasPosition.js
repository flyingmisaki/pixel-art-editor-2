import React, {useState, useContext, createContext} from "react"

const CanvasPositionContext = createContext()

export function useCanvasPosition() {
    return useContext(CanvasPositionContext)
}

export function CanvasPositionProvider(props) {
    const [canvasPosition, setCanvasPosition] = useState({x: null, y: null})

    return (
        <CanvasPositionContext.Provider value={{canvasPosition, setCanvasPosition}}>
            {props.children}
        </CanvasPositionContext.Provider>
    )
}