import React, {useEffect, useRef} from "react";
import "./ExportPanel.css"

import {useLayers} from "../../../hooks/useLayers";

import OptionWindow from "../../common/OptionWindow/OptionWindow";

import {clearCanvas, copyCanvasContents} from "../../../core/utils/canvas"
import { useProjectSettings } from "../../../hooks/useProjectSettings"

import { saveAs } from "file-saver"

export default function ExportPanel() {
    const {layers} = useLayers()
    const {width, height} = useProjectSettings()

    const exportCanvasRef = useRef(null)

    const exportImage = function() {
		if(!exportCanvasRef.current) return
		const imageUrl = exportCanvasRef.current.toDataURL("image/png")
		console.log("Exported to url: ", imageUrl)
		saveAs(imageUrl, "export.png")
	}

    useEffect(() => {
        function generateExportPreview() {
            const exportPreviewCanvas = exportCanvasRef.current
            if (!exportPreviewCanvas) return
            clearCanvas(exportPreviewCanvas)
            layers.forEach(layer => {
                const layerCanvas = layer.canvasRef.current
                copyCanvasContents(layerCanvas, exportPreviewCanvas, false)
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
                    <canvas
                        className="exportPreviewCanvas"
                        ref={exportCanvasRef}
                        width={width}
                        height={height}
                    />
                    <div className="panelBottom">
                        <button className="exportButton" onClick={exportImage}>Export from Layers</button>
                    </div>
                </div>
            </OptionWindow>
        )
    }
    
    return render()
}