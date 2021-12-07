import React, {useState, useContext, createContext, useEffect} from "react"
import Pixel from "../core/tools/Pixel"

const ActiveToolContext = createContext()

export function useActiveTool(defaultTool = null) {
    const {activeTool, setActiveTool, toolStatus} = useContext(ActiveToolContext)

    if(activeTool === undefined) setActiveTool(defaultTool)

    return {activeTool, setActiveTool, toolStatus}
}

export function ActiveToolProvider(props) {
    const [activeTool, setActiveTool] = useState(Pixel)
    const [toolStatus, setToolStatus] = useState("")

    activeTool.onStatusChange = setToolStatus

    useEffect(() => {
        setToolStatus(`Selected ${activeTool.name}`)
        
    }, [activeTool])

    return (
        <ActiveToolContext.Provider value={{activeTool, setActiveTool, toolStatus}}>
            {props.children}
        </ActiveToolContext.Provider>
    )
}