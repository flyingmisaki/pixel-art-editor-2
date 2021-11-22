import React, {useState, useContext, createContext, useRef} from "react"
import Layer from "../core/Layer"

const LayersContext = createContext()

export function useLayers(){
    return useContext(LayersContext)
}

export function LayersProvider(props){
    const defaultLayer = new Layer("Layer 0")
    const [layers, setLayers] = useState([defaultLayer])
    const [activeLayer, setActiveLayer] = useState(defaultLayer)

    const layerIndexRef = useRef(1)

    const addLayer = () => {
        const layerIndex = layerIndexRef.current
        const layerName = `Layer ${layerIndex}`

        const layer = new Layer(layerName)

        const newLayers = [...layers, layer]

        layerIndexRef.current += 1

        // Sets the added layer as the active layer
        setActiveLayer(layer)

        setLayers(newLayers)
    }

    const removeLayer = () => {
        
    }

    const layersData = {
        layers,
        activeLayer,
        setLayers,
        addLayer,
        setActiveLayer
    }

    return (
        <LayersContext.Provider value={layersData}>
            {props.children}
        </LayersContext.Provider>
    )
}