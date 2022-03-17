import React, { useState, useContext, createContext, useEffect } from "react"
import Brush from "../core/tools/Brush"

const ActiveToolContext = createContext()

export function useActiveTool(defaultTool = null) {
    const {activeTool, setActiveTool, toolStatus, scale, setScale} = useContext(ActiveToolContext)

    if(activeTool === undefined) setActiveTool(defaultTool)

    return {activeTool, setActiveTool, toolStatus, scale, setScale}
}

export function ActiveToolProvider(props) {
    const [activeTool, setActiveTool] = useState(Brush)
    const [toolStatus, setToolStatus] = useState("")
    const [scale, setScale] = useState(1)

    const setToolScale = function(scale) {
        activeTool.options.scale = scale
        setScale(scale)
    }

    activeTool.onStatusChange = setToolStatus

    useEffect(() => {
        setToolStatus(`Selected ${activeTool.name}`)
        setScale(activeTool.options.scale)
        
    }, [activeTool])

    return (
        <ActiveToolContext.Provider value={{activeTool, setActiveTool, toolStatus, scale, setScale : setToolScale}}>
            {props.children}
        </ActiveToolContext.Provider>
    )
}