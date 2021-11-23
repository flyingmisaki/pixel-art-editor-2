import {useRef, useState} from "react"
import "./CanvasLayer.css"

export default function CanvasLayer(props) {
    const {layer, width, height} = props
    
    const canvasLayerRef = useRef(null)
    layer.canvasRef = canvasLayerRef

    const [visible, setVisible] = useState(layer.isVisible)

    layer.addUpdateListener(() => setVisible(layer.isVisible))

    const render = function() {
        const className = `canvasLayer ${visible ? "" : "hidden"}`

        return (
            <canvas 
                className={className} 
                ref={canvasLayerRef}
                width={width}
                height={height}
            />
        )
    }

    return render()
}