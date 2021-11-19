import React, { useRef } from "react"
import './PixelCanvas.css'
import {useActiveTool} from "../../hooks/useActiveTool"
import {useBrushColor} from "../../hooks/useBrushColor"
import {useLayers} from "../../hooks/useLayers"
import CanvasLayer from "./CanvasLayer/CanvasLayer"

export default function PixelCanvas(props) {
    const {width, height, scale} = props
    const {layers, activeLayer} = useLayers()
    const [activeTool] = useActiveTool()
    const [brushColor] = useBrushColor("#197D7DFF")

    const pixelCanvasRef = useRef(null)

    const handleMouseDown = function(event) {
        if (!activeTool || !activeLayer) return
        
        const pixelCanvasElement = pixelCanvasRef.current

        const mouseX = event.clientX
        const mouseY = event.clientY
        
        const currentX = mouseX - pixelCanvasElement.offsetLeft
        const currentY = mouseY - pixelCanvasElement.offsetTop

        const canvasRelativeX = Math.floor(currentX/scale)
        const canvasRelativeY = Math.floor(currentY/scale)

        const layerCanvasContext = activeLayer.canvasRef.current.getContext('2d')

        activeTool.mouseDown(layerCanvasContext, canvasRelativeX, canvasRelativeY, brushColor)
    }

    React.useEffect(() => {
        const pixelCanvasElement = pixelCanvasRef.current
    
        if (pixelCanvasElement === null) return

        // Set up listeners
        pixelCanvasElement.addEventListener("mousedown", handleMouseDown)

        return () => {
        
            // Tear down listeners
            pixelCanvasElement.removeEventListener("mousedown", handleMouseDown)
        }
    },  
        [activeLayer, scale, width, height, brushColor]
    )

    const render = function() {
        const elementWidth = width * scale
        const elementHeight = height * scale

        const canvasStyle = {
            width: `${elementWidth}px`,
            height: `${elementHeight}px`
        }

        return (
            <div className="pixelCanvas" ref={pixelCanvasRef} style={canvasStyle}>
                {layers.map(layer => (
                    <CanvasLayer 
                        layer={layer} 
                        width={width} 
                        height={height}
                    />)
                )}
            </div>
        )
    }

    return render()
}