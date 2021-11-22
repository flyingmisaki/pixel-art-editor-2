import React from "react";
import {useLayers} from "../../hooks/useLayers";
import "./LayersPanel.css"

// import {saveAs} from "file-saver"
import {BsPlusLg} from "react-icons/bs";
import LayerPreview from "./LayerPreview/LayerPreview";

export default function LayersPanel() {

    const {layers, addLayer} = useLayers()

    // const exportImage = function() {
	// 	if(!canvasRef.current) return
	// 	const imageUrl = canvasRef.current.toDataURL("image/png")
	// 	console.log("Exported to url: ", imageUrl)
	// 	saveAs(imageUrl, "export.png")
	// }

    const render = function() {
        return (
            <div className="LayersPanel">
                <div className="layersPanelTop">
                    <button onClick={addLayer} className="addLayerButton"><BsPlusLg/></button>
                </div>
                <div className="layers">
                    {[...layers].reverse().map(layer => 
                        (<LayerPreview
                            layer={layer}
                        />)
                    )}
                </div>
                <div className="exportRegion">
                    <button className="exportButton">Export!</button>
                </div>
            </div>
        )
    }
    
    return render()
}