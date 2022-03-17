import React, { useEffect, useRef } from "react"
import "./LayersPanel.css"

import OptionWindow from "../../common/OptionWindow/OptionWindow"
import LayerPreview from "./LayerPreview/LayerPreview"
import { BsPlusLg } from "react-icons/bs"

import { useHistory } from "../../../hooks/useHistory"
import { useLayers } from "../../../hooks/useLayers"

export default function LayersPanel() {
    const {layers, addLayer} = useLayers()
    const {pushEntryToHistory} = useHistory()

    const layerAddedOrDeletedRef = useRef(false)

    const onAddLayer = function() {
        addLayer()
        layerAddedOrDeletedRef.current = true
    }

    const onDeleteLayer = function(){
        layerAddedOrDeletedRef.current = true
    }

    useEffect(() => {
        if (layerAddedOrDeletedRef.current) {
            pushEntryToHistory()
            layerAddedOrDeletedRef.current = false
        }
    }, [layers, pushEntryToHistory])

    const render = function() {
        return (
            <OptionWindow title="Layers">
                <div className="LayersPanel">
                    <div className="panelTop">
                        <button onClick={onAddLayer} className="addLayerButton"><BsPlusLg/> Add layer</button>
                    </div>
                    <div className="layers">
                        {[...layers].reverse().map(layer => 
                            (
                                <LayerPreview
                                    key={layer.id}
                                    layer={layer}
                                    onDelete={onDeleteLayer}
                                />
                            )
                        )}
                    </div>
                </div>
            </OptionWindow>
        )
    }
    
    return render()
}