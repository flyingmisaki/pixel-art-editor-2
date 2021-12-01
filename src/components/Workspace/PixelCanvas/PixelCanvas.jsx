import {React, useRef, useEffect} from "react"
import './PixelCanvas.css'
import {useActiveTool} from "../../../hooks/useActiveTool"
import {useBrushColor} from "../../../hooks/useBrushColor"
import {useLayers} from "../../../hooks/useLayers"
import CanvasLayer from "./CanvasLayer/CanvasLayer"

export default function PixelCanvas(props) {
    const {width, height, scale} = props
    const {layers, activeLayer} = useLayers()
    const [activeTool] = useActiveTool()
    const [brushColor] = useBrushColor("#197D7DFF")

    const pixelCanvasRef = useRef(null)
    
    // Sets up listeners for mouse events on the canvas
    useEffect(() => {
        // Don't set listeners up if no active layer
        if (!activeTool || !activeLayer || activeLayer.isLocked) return

        const getCanvasRelativePosition = function(mouseEvent) {
            const mouseX = mouseEvent.clientX
            const mouseY = mouseEvent.clientY
            const pixelCanvasElement = pixelCanvasRef.current
            
            const currentX = mouseX - pixelCanvasElement.offsetLeft
            const currentY = mouseY - pixelCanvasElement.offsetTop
        
            return ({
                x : Math.floor(currentX/scale),
                y : Math.floor(currentY/scale),
            }) 
        }

        const pixelCanvasElement = pixelCanvasRef.current

        const layerCanvasContext = activeLayer.canvasRef.current.getContext('2d')

        const handleMouseDown = function(event) {
            const position = getCanvasRelativePosition(event)
            console.log(position)
            activeTool.mouseDown(layerCanvasContext, position, brushColor)
        }

        const handleMouseUp = function(event) {
            const position = getCanvasRelativePosition(event)
            activeTool.mouseUp(layerCanvasContext, position, brushColor)
        }

        const handleMouseMove = function(event) {

        }

        if (pixelCanvasElement === null) return

        // Set up listeners
        pixelCanvasElement.addEventListener("mousedown", handleMouseDown)
        pixelCanvasElement.addEventListener("mouseup", handleMouseUp)
        pixelCanvasElement.addEventListener("mousemove", handleMouseMove)

        return () => {
        
            // Tear down listeners
            pixelCanvasElement.removeEventListener("mousedown", handleMouseDown)
            pixelCanvasElement.removeEventListener("mouseup", handleMouseUp)
            pixelCanvasElement.removeEventListener("mousemove", handleMouseMove)
        }
    },  
        [activeTool, activeLayer, scale, width, height, brushColor]
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
                        key={layer.id} 
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