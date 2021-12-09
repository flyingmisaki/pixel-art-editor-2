import {React, useRef} from "react";
import { useCanvas } from "../../../../hooks/useCanvas";
import './PreviewLayer.css'

export default function PreviewLayer() {
    const {previewLayerCanvas, width, height} = useCanvas()

    const previewLayerCanvasRef = useRef(previewLayerCanvas)

    const render = function() {
        return (
            <div className="previewLayer">
                <canvas
                    ref={previewLayerCanvasRef}
                    width={width}
                    height={height}
                />
            </div>
        )
    }
    return render()
}