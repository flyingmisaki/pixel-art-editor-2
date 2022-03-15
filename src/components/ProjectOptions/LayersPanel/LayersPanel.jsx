import React, {useEffect, useRef} from "react"
import {useLayers} from "../../../hooks/useLayers"
import "./LayersPanel.css"

import OptionWindow from "../../common/OptionWindow/OptionWindow"

// import {saveAs} from "file-saver"
import {BsPlusLg} from "react-icons/bs"
import LayerPreview from "./LayerPreview/LayerPreview"
import { useHistory } from "../../../hooks/useHistory"

export default function LayersPanel() {
    const {layers, addLayer} = useLayers()
    const {pushEntryToHistory} = useHistory()

    const newLayerAddedRef = useRef(false)

    const onAddLayer = function() {
        addLayer()
        newLayerAddedRef.current = true
    }

    useEffect(() => {
        if (newLayerAddedRef.current) {
            pushEntryToHistory()
            newLayerAddedRef.current = false
        }
    }, [layers])

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