import React, {useState, useContext, createContext} from "react"

const BrushColorContext = createContext()
const DEFAULT_COLOR = {r:0, g:0, b:0, a:1}

export function useBrushColor() {
    return useContext(BrushColorContext)
}

export function BrushColorProvider(props) {
    const [brushColor, setBrushColor] = useState(DEFAULT_COLOR)
    const [colorHistory, setColorHistory] = useState([brushColor])

    const pushColorToHistory = function(colorToAdd) {
        if (colorToAdd === colorHistory[0]) return
        const filteredHistory = colorHistory.filter(color => color !== colorToAdd)
        const newColorHistory = [colorToAdd, ...filteredHistory].slice(0, 16)
        setColorHistory(newColorHistory)
    }

    const brushColorData = {
        brushColor, setBrushColor,
        colorHistory, pushColorToHistory
    }

    return (
        <BrushColorContext.Provider value={brushColorData}>
            {props.children}
        </BrushColorContext.Provider>
    )
}