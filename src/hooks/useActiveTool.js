import React, {useState, useContext, createContext} from "react"

const ActiveToolContext = createContext()

export function useActiveTool(defaultTool = null){
    const [activeTool, setActiveTool] = useContext(ActiveToolContext)

    if(activeTool === undefined) setActiveTool(defaultTool)

    return [activeTool, setActiveTool]
}

export function ActiveToolProvider(props){
    const [activeTool, setActiveTool] = useState(undefined)

    return (
        <ActiveToolContext.Provider value={[activeTool, setActiveTool]}>
            {props.children}
        </ActiveToolContext.Provider>
    )
}