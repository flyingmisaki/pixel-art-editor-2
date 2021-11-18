import React from "react";
import {useLayers} from "../../hooks/useLayers";
import "./LayersPanel.css"
import {saveAs} from "file-saver"
import {BsPlusLg, BsTrashFill, BsEyeFill, BsLockFill} from "react-icons/bs";

export default function LayersPanel() {

    const {layers, activeLayer, addLayer, setActiveLayer} = useLayers()

    const renderLayer = function(layer) {
        const isActive = activeLayer?.id == layer.id

        const className = `layerPreview ${isActive ? "active" : ""}`
        
        return (
            <div className={className} onClick={() => setActiveLayer(layer)}>
                <div className="previewImage">preview</div>
                <div className="layerPreviewInner">
                    <label className="layerPreviewTitle">{layer.name}</label>
                    <div>
                        <button className="layerActionButton"><BsEyeFill/></button>
                        <button className="layerActionButton"><BsLockFill/></button>
                        <button className="layerActionButton"><BsTrashFill/></button>
                    </div>
                </div>
            </div>
        )
    }

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
                    {[...layers].reverse().map(renderLayer)}
                </div>
                <div className="exportRegion">
                    <button className="exportButton">Export!</button>
                </div>
            </div>
        )
    }
    
    return render()
}