import React, {useState, useContext, createContext, useRef, useEffect} from "react"
import Layer from "../core/Layer"

const LayersContext = createContext()

export function useLayers(){
    return useContext(LayersContext)
}

export function LayersProvider(props){
    const [layers, setLayers] = useState([])
    const [activeLayer, setActiveLayer] = useState(null)

    const layersAddedTotalRef = useRef(0)

    const addLayer = function() {
        const layerIndex = layersAddedTotalRef.current
        const layerName = `Layer ${layerIndex}`

        const layer = new Layer(layerName)

        const newLayers = [...layers, layer]

        layersAddedTotalRef.current += 1

        // Sets the added layer as the active layer
        setActiveLayer(layer)

        setLayers(newLayers)

        console.log(`Added layer (id = ${layer.id})`)
    }

    const removeLayer = function(layer) {
        if (!layer || layer.isLocked) return
        
        if (layer.id === activeLayer?.id) {
            const layerIndex = layers.indexOf(layer)
            
            if (layers.length === 1) {
                setActiveLayer(null)
            }
            else if (layerIndex === 0) {
                setActiveLayer(layers[layerIndex + 1])
            }
            else {
                setActiveLayer(layers[layerIndex - 1])
            }
        }
        
        layer.listeners = []
        const newLayers = layers.filter(l => l.id !== layer.id)
        setLayers(newLayers)

        console.log(`Deleted layer (index = ${layers.indexOf(layer)}, id = ${layer.id})`)
    }

    // Layers gets stuck as empty list in closure, but only runs once so its fine
    // eslint-disable-next-line
    useEffect(addLayer, [])

    const layersData = {
        layers,
        activeLayer,
        setLayers,
        addLayer,
        removeLayer,
        setActiveLayer,
    }

    return (
        <LayersContext.Provider value={layersData}>
            {props.children}
        </LayersContext.Provider>
    )
}