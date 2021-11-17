import React, {useState, useContext, createContext} from "react"

const LayersContext = createContext()

export function useLayers(){
    return useContext(LayersContext)
}

export function LayersProvider(props){
    const [layers, setLayers] = useState([])

    const [activeLayerId, setActiveLayerId] = useState(null)

    const getActiveLayer = () => {
        
    }

    const layersData = {
        layers,
        setLayers
    }

    return (
        <LayersContext.Provider value={layersData}>
            {props.children}
        </LayersContext.Provider>
    )
}

// Active layer, layer ids, add layers, remove layers aqnd change order