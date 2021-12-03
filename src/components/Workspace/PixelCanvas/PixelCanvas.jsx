import {React, useRef, useEffect} from "react"
import './PixelCanvas.css'
import {useActiveTool} from "../../../hooks/useActiveTool"
import {useBrushColor} from "../../../hooks/useBrushColor"
import {useLayers} from "../../../hooks/useLayers"
import CanvasLayer from "./CanvasLayer/CanvasLayer"
// import checkeredBackground from "../../../svg/checkeredBackground.svg"

export default function PixelCanvas(props) {
    const {width, height, scale} = props
    const {layers, activeLayer} = useLayers()
    const [activeTool] = useActiveTool()
    const {brushColor, pushColorToHistory} = useBrushColor()

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
        activeTool.canvasContext = layerCanvasContext

        const handleMouseDown = function(event) {
            const clickCode = event.button
            const position = getCanvasRelativePosition(event)
            switch (clickCode) {
                case 0:
                    if (activeTool.usesColors) pushColorToHistory(brushColor)
                    activeTool.mouseDown(position, brushColor)
                    break
                default: break
            } 
        }

        const handleMouseUp = function(event) {
            const clickCode = event.button
            const position = getCanvasRelativePosition(event)
            switch (clickCode) {
                case 0:
                    activeTool.mouseUp(position, brushColor)
                    break
                    default: break
                }
            activeLayer.onUpdate()
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