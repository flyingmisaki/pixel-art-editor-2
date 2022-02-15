import React, {createContext, useState, useContext} from "react"
import { useLayers } from "./useLayers"

class HistoryEntry {
    constructor(layers) {
        this.layers = layers.map((layer) => new LayerData(layer))

    }
}

class LayerData {
    constructor(layer) {
        this.dataUrl = layer.canvasRef.current.toDataURL("image/png")
        this.image = null
    }
}

const HistoryContext = createContext()

export function useHistory() {
    return useContext(HistoryContext)
}

export function HistoryProvider(props) {
    const {layers} = useLayers()
    const [historyStack, setHistoryStack] = useState([])

    const undo = function() {

    }

    const redo = function() {

    }

    const pushEntryToHistory = function() {
        setHistoryStack([HistoryEntry, historyStack])
    }

    const historyData = {
        undo, redo
    }

    return (
        <HistoryContext.Provider value={historyData}>
            {props.children}
        </HistoryContext.Provider>
    )
}