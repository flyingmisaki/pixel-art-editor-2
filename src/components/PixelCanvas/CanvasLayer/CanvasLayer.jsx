import {useRef} from "react"
import "./CanvasLayer.css"

export default function CanvasLayer(props) {
    const {layer, width, height} = props
    
    const canvasLayerRef = useRef(null)

    layer.canvasRef = canvasLayerRef
    
    const render = function() {

        return (
            <canvas 
                className="canvasLayer" 
                ref={canvasLayerRef}
                width={width}
                height={height}
            />
        )
    }

    return render()
}