import React, {useState, useContext, createContext, useRef} from "react"
import Layer from "../core/Layer"

const LayersContext = createContext()

export function useLayers(){
    return useContext(LayersContext)
}

export function LayersProvider(props){
    const [layers, setLayers] = useState([])
    const [activeLayer, setActiveLayer] = useState(null)

    const layerIndexRef = useRef(0)

    const addLayer = () => {
        const layerIndex = layerIndexRef.current
        const layerName = `Layer ${layerIndex}`

        const layer = new Layer(layerName)

        const newLayers = [...layers, layer]

        layerIndexRef.current += 1

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