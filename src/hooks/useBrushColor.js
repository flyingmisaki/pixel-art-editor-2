import React, {useState, useContext, createContext} from "react"

const BrushColorContext = createContext()

export function useBrushColor(defaultColor = {r:0,g:0,b:0,a:255}){
    const [brushColor, setBrushColor] = useContext(BrushColorContext)

    if(brushColor === undefined) setBrushColor(defaultColor)

    return [brushColor, setBrushColor]
}

export function BrushColorProvider(props){
    const [brushColor, setBrushColor] = useState(undefined)

    return (
        <BrushColorContext.Provider value={[brushColor, setBrushColor]}>
            {props.children}
        </BrushColorContext.Provider>
    )
}