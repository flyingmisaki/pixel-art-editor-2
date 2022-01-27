import React, {useState, useContext, createContext} from "react"
import { colorsEqual } from "../core/utils/colors"

const BrushColorContext = createContext()
const DEFAULT_COLOR = {r:0, g:0, b:0, a:1}

export function useBrushColor() {
    return useContext(BrushColorContext)
}

export function BrushColorProvider(props) {
    const [brushColor, setBrushColor] = useState(DEFAULT_COLOR)
    const [colorHistory, setColorHistory] = useState([brushColor])
    const [colorPickerColor, setColorPickerColor] = useState([null])

    const pushColorToHistory = function(colorToAdd) {
        const filteredHistory = colorHistory.filter(color => !colorsEqual(color, colorToAdd))
        const newColorHistory = [colorToAdd, ...filteredHistory].slice(0, 16)
        setColorHistory(newColorHistory)
    }

    const brushColorData = {
        brushColor, setBrushColor,
        colorHistory, pushColorToHistory,
        colorPickerColor, setColorPickerColor
    }

    return (
        <BrushColorContext.Provider value={brushColorData}>
            {props.children}
        </BrushColorContext.Provider>
    )
}