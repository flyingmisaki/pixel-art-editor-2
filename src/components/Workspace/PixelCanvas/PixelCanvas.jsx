import {React, useRef, useEffect} from "react"
import './PixelCanvas.css'
import {useActiveTool} from "../../../hooks/useActiveTool"
import {useBrushColor} from "../../../hooks/useBrushColor"
import {useLayers} from "../../../hooks/useLayers"
import {useCanvasPosition} from "../../../hooks/useCanvasPosition"
import CanvasLayer from "./CanvasLayer/CanvasLayer"
// import checkeredBackground from "../../../svg/checkeredBackground.svg"
import {getCanvasRelativePosition} from "../../../core/utils/coordinates"

export default function PixelCanvas(props) {
    const {width, height, scale} = props
    const {layers, activeLayer} = useLayers()
    const {activeTool} = useActiveTool()
    const {brushColor, pushColorToHistory} = useBrushColor()
    const {setCanvasPosition} = useCanvasPosition()

    const pixelCanvasRef = useRef(null)
    const previewLayerCanvasRef = useRef(null)

    const previousMousePositionRef = useRef({x: null, y: null})
    
    // Sets up listeners for mouse events on the canvas
    useEffect(() => {
        // Don't set listeners up if no active layer
        if (!activeTool || !activeLayer || activeLayer.isLocked || !previewLayerCanvasRef.current) return

        const pixelCanvasElement = pixelCanvasRef.current

        const layerCanvasContext = activeLayer.canvasRef.current.getContext('2d')
        activeTool.canvasContext = layerCanvasContext

        const previewCanvasContext = previewLayerCanvasRef.current.getContext('2d')
        activeTool.previewCanvasContext = previewCanvasContext

        const handleMouseDown = function(event) {
            const clickCode = event.button
            const position = getCanvasRelativePosition(event, pixelCanvasRef, scale)
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
            const position = getCanvasRelativePosition(event, pixelCanvasRef, scale)
            switch (clickCode) {
                case 0:
                    activeTool.mouseUp(position, brushColor)
                    break
                default: break
            }
            previewCanvasContext.clearRect(0, 0, width, height)
            activeLayer.onUpdate()
        }

        const handleMouseMove = function(event) {
            const position = getCanvasRelativePosition(event, pixelCanvasRef, scale)
            const previousPosition = previousMousePositionRef.current
            
            if (previousPosition.x !== position.x || previousPosition.y !== position.y) {
                previewCanvasContext.clearRect(0, 0, width, height)
                if (!(position.x > props.width || position.x < 0 || position.y > props.height || position.y < 0)) {
                    activeTool.mouseMove(position, brushColor)
                }
                previousMousePositionRef.current = position
                setCanvasPosition(position)
            }
        }

        if (pixelCanvasElement === null) return

        // Set up listeners
        pixelCanvasElement.addEventListener("mousedown", handleMouseDown)
        pixelCanvasElement.addEventListener("mouseup", handleMouseUp)

        document.addEventListener("mousemove", handleMouseMove)

        return () => {
        
            // Tear down listeners
            pixelCanvasElement.removeEventListener("mousedown", handleMouseDown)
            pixelCanvasElement.removeEventListener("mouseup", handleMouseUp)

            document.removeEventListener("mousemove", handleMouseMove)
        }
    }, [activeTool, activeLayer, scale, width, height, brushColor, pushColorToHistory, setCanvasPosition, props.width, props.height]
    )

    const renderPreviewLayer = function() {
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
                {renderPreviewLayer()}
            </div>
        )
    }

    return render()
}