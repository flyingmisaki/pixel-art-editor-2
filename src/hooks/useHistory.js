import React, { createContext, useState, useContext, useRef } from "react"
import { useLayers } from "./useLayers"
import { useProjectSettings } from "./useProjectSettings"

class HistoryEntry {
    constructor(layers) {
        this.layers = layers.map((layer) => new LayerData(layer))
    }
}

class LayerData {
    constructor(layer) {
        this.imageData = layer.canvasRef.current.toDataURL("image/png")
        this.metaData = {...layer}
        delete this.metaData.canvasRef
    }
}

const restoreCanvasFromLayerData = function(canvasElement, layerData) {
    return new Promise((resolve, reject) => {
    
        const canvasElementContext = canvasElement.getContext('2d')

        const image = new Image()
        image.src = layerData.imageData

        image.onload = () => {
            // layerCanvasContext.clearRect(0, 0, layerCanvas.width, layerCanvas.height)
            canvasElementContext.drawImage(image, 0, 0)
            resolve()
        }
    })
}

const restoreLayerFromData = function(layer, layerData) {
    // console.log(layer, layerData)
    Object.assign(layer, layerData.metaData)

    const layerCanvas = layer.canvasRef.current
    restoreCanvasFromLayerData(layerCanvas, layerData)
        .then(() => layer.onUpdate())
}

const HistoryContext = createContext()

export function useHistory() {
    return useContext(HistoryContext)
}

export function HistoryProvider(props) {
    const {layers, addLayer, removeLayer} = useLayers()
    const {width, height} = useProjectSettings()
    const [historyStack, setHistoryStack] = useState([])
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)

    const canUndo = currentHistoryIndex > 0
    const canRedo = currentHistoryIndex < historyStack.length - 1

    const layerToRestoreRef = useRef(null)

    const undo = function() {
        if (!canUndo) return
        setCurrentHistoryIndex(currentHistoryIndex - 1)
        const lastEntry = historyStack[currentHistoryIndex - 1]
        restoreLayers(lastEntry)
    }

    const redo = function() {
        if (!canRedo) return
        setCurrentHistoryIndex(currentHistoryIndex + 1)
        const nextEntry = historyStack[currentHistoryIndex + 1]
        restoreLayers(nextEntry)
    }

    const pushEntryToHistory = function() {
        const entry = new HistoryEntry(layers)
        setCurrentHistoryIndex(currentHistoryIndex + 1)
        const previousEntries = historyStack.slice(0, currentHistoryIndex + 1)
        const newHistoryStack = [...previousEntries, entry]
        // console.log("history index: ", currentHistoryIndex)
        // console.log("pushEntryToHistory new: ", newHistoryStack)
        
        setHistoryStack(newHistoryStack)
    }

    const restoreLayers = function(entry) {
        // Clear all the layers
        layers.forEach(layer => {
            // Check if the layer is in the history entry
            if (entry.layers.some(layerData => layerData.metaData.id === layer.id)) {
                layer.canvasRef.current.getContext('2d').clearRect(0, 0, width, height)
                layer.onUpdate()
            }
            // If not, remove the layer
            else {
                removeLayer(layer)
            }
        })

        // Go through each of the layer data objs in the entry and restore the layers from those
        entry.layers.forEach(layerData => {
            // Find the layer that matches our layerData object (so we can restore it)
            const layerToRestore = layers.find(layer => layer.id === layerData.metaData.id)
            if (layerToRestore) {
                // console.log(layerToRestore, layerData, historyStack)
                restoreLayerFromData(layerToRestore, layerData)
            }
            else {
                const blankLayer = addLayer()

                layerToRestoreRef.current = [blankLayer, layerData]

                restoreLayerFromData(blankLayer, layerData)
                // restoreLayerFromData(blankLayer, layerData)
            }
        })
    }

    const clearHistory = function() {
        setHistoryStack([])
    }

    const historyData = {
        undo, redo,
        canUndo, canRedo,
        pushEntryToHistory,
        clearHistory
    }

    return (
        <HistoryContext.Provider value={historyData}>
            {props.children}
        </HistoryContext.Provider>
    )
}