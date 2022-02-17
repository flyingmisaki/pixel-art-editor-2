import {React} from "react";
import {useProjectSettings} from "../../../../hooks/useProjectSettings";
import './PreviewLayer.css'

export default function PreviewLayer() {
    const {previewLayerCanvasRef, width, height} = useProjectSettings()

    const render = function() {
        return (
            <div className="PreviewLayer">
                <canvas
                    ref={previewLayerCanvasRef}
                    width={width}
                    height={height}
                    id="previewLayerCanvas"
                />
            </div>
        )
    }
    return render()
}