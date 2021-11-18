import React from "react";
import {useLayers} from "../../hooks/useLayers";
import "./LayersPanel.css"
import {saveAs} from "file-saver"
import {BsPlusLg, BsTrashFill, BsEyeFill, BsLockFill} from "react-icons/bs";

export default function LayersPanel() {

    const {layers, addLayer} = useLayers()

    const renderLayer = function(layer) {
        return (
            <div className="layerPreview">
                <div className="previewImage"></div>
                <div className="layerPreviewInner">
                    <label className="layerPreviewTitle">{layer.id}</label>
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
                    {layers.map(renderLayer)}
                </div>
                <div className="exportRegionButton">
                    <button>Export!</button>
                </div>
            </div>
        )
    }

    return render()
}