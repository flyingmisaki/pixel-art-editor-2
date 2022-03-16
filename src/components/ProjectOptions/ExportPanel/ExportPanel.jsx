import React, {useEffect, useRef} from "react";
import "./ExportPanel.css"

import {useLayers} from "../../../hooks/useLayers";

import OptionWindow from "../../common/OptionWindow/OptionWindow";

import {clearCanvas, copyCanvasContents} from "../../../core/utils/canvas"
import { useProjectSettings } from "../../../hooks/useProjectSettings"

import { saveAs } from "file-saver"
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function ExportPanel() {
    const {layers} = useLayers()
    const {width, height} = useProjectSettings()

    const exportCanvasRef = useRef(null)

    const exportImage = function() {
		if(!exportCanvasRef.current) return
		const imageUrl = exportCanvasRef.current.toDataURL("image/png")
		console.log("Exported to url: ", imageUrl)
		saveAs(imageUrl, "pxlexport.png")
	}

    useEffect(() => {
        function generateExportPreview() {
            const exportPreviewCanvas = exportCanvasRef.current
            if (!exportPreviewCanvas) return
            clearCanvas(exportPreviewCanvas)
            layers.forEach(layer => {
                const layerCanvas = layer.canvasRef.current
                if (layerCanvas) copyCanvasContents(layerCanvas, exportPreviewCanvas, false) 
            })
        }

        generateExportPreview()

        layers.forEach(layer => {
            layer.addUpdateListener(generateExportPreview)
        })

        return () => {
            layers.forEach(layer => {
                layer.removeUpdateListener(generateExportPreview)
            })
        }
    }, [layers])

    const render = function() {
        return (
            <OptionWindow title="Export">
                <div className="ExportPanel">
                    <div className="panelTop">
                        <button className="exportButton" onClick={exportImage}><BsBoxArrowUpRight/> Export from Layers</button>
                    </div>
                    <canvas
                        className="exportPreviewCanvas"
                        ref={exportCanvasRef}
                        width={width}
                        height={height}
                    />
                </div>
            </OptionWindow>
        )
    }
    
    return render()
}