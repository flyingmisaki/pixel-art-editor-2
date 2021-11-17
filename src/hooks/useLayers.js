import React, {useState, useContext, createContext} from "react"
import Layer from "../core/Layer"

const LayersContext = createContext()

export function useLayers(){
    return useContext(LayersContext)
}

export function LayersProvider(props){
    const [layers, setLayers] = useState([])

    const [activeLayerId, setActiveLayerId] = useState(null)

    const getActiveLayer = () => {
        
    }

    const addLayer = () => {
        const layer = new Layer()

        const newLayers = [...layers, layer]

        setLayers(newLayers)
    }

    const layersData = {
        layers,
        setLayers,
        addLayer
    }

    return (
        <LayersContext.Provider value={layersData}>
            {props.children}
        </LayersContext.Provider>
    )
}