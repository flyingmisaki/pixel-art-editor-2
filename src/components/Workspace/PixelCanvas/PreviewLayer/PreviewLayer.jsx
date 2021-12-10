import {React} from "react";
import {useProjectSettings} from "../../../../hooks/useProjectSettings";
import './PreviewLayer.css'

export default function PreviewLayer() {
    const {previewLayerCanvasRef, width, height} = useProjectSettings()

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