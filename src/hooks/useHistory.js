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
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)

    const canUndo = currentHistoryIndex > 0
    const canRedo = currentHistoryIndex !== historyStack.length - 1

    console.log(currentHistoryIndex, canUndo, canRedo)


    const undo = function() {
        if (!canUndo) return
        setCurrentHistoryIndex(currentHistoryIndex - 1)
        console.log(currentHistoryIndex - 1)
        const lastEntry = historyStack[currentHistoryIndex - 1]
        restoreLayers(lastEntry)
    }

    const redo = function() {
        if (!canRedo) return
        setCurrentHistoryIndex(currentHistoryIndex + 1)
        console.log(currentHistoryIndex + 1)
        const nextEntry = historyStack[currentHistoryIndex + 1]
        restoreLayers(nextEntry)    
    }

    const pushEntryToHistory = function() {
        const entry = new HistoryEntry(layers)
        setHistoryStack([...historyStack, entry])
        setCurrentHistoryIndex(currentHistoryIndex + 1)
        console.log("pushing entry", entry, currentHistoryIndex + 1, historyStack)
    }

    const restoreLayers = function(entry) {

    }

    const historyData = {
        undo, redo,
        pushEntryToHistory,
        canUndo,
        canRedo
    }

    return (
        <HistoryContext.Provider value={historyData}>
            {props.children}
        </HistoryContext.Provider>
    )
}