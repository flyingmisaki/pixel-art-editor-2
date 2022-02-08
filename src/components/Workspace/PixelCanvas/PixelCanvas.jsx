import {React, useRef, useEffect} from "react"
import './PixelCanvas.css'
import {useActiveTool} from "../../../hooks/useActiveTool"
import {useBrushColor} from "../../../hooks/useBrushColor"
import {useLayers} from "../../../hooks/useLayers"
import {useProjectSettings} from "../../../hooks/useProjectSettings"
import CanvasLayer from "./CanvasLayer/CanvasLayer"
// import PreviewLayer from "./PreviewLayer/PreviewLayer"
// import checkeredBackground from "../../../svg/checkeredBackground.svg"
import {getCanvasRelativePosition} from "../../../core/utils/coordinates"
import PreviewLayer from "./PreviewLayer/PreviewLayer"
import colorPicker from "../../../core/options/ColorPicker"
import Brush from "../../../core/tools/Brush"
import { colorToCanvasColor } from "../../../core/utils/colors"

export default function PixelCanvas() {
    const {setCanvasCursorPosition, previewLayerCanvasRef, width, height, scale, setScale} = useProjectSettings()
    const {layers, activeLayer} = useLayers()
    const {activeTool, setActiveTool} = useActiveTool()
    const {brushColor, setBrushColor, colorPickerColor, setColorPickerColor, pushColorToHistory} = useBrushColor()

    const pixelCanvasRef = useRef(null)

    const previousMousePositionRef = useRef({x: null, y: null})

    // Sets up listeners for mouse events on the canvas
    useEffect(() => {
        // Don't set listeners up if no active layer
        if (!activeTool || !activeLayer || activeLayer.isLocked === true || !previewLayerCanvasRef.current) return

        const pixelCanvasElement = pixelCanvasRef.current

        const layerCanvasContext = activeLayer.canvasRef.current.getContext('2d')
        activeTool.canvasContext = layerCanvasContext

        const previewCanvasContext = previewLayerCanvasRef.current.getContext('2d')
        activeTool.previewCanvasContext = previewCanvasContext

        // Mouse stuff handlers
        const handleMouseDown = function(event) {
            const clickCode = event.button
            const position = getCanvasRelativePosition(event, scale)
            
            
            if (position.x < 0 || position.x > (width - 1) || position.y < 0 || position.y > (height - 1) || activeLayer.isLocked) return

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
            const position = getCanvasRelativePosition(event, scale)

            if (activeTool === colorPicker) {
                if (!colorPicker.color) return
                setActiveTool(Brush)
                setBrushColor(colorPicker.color)
                setColorPickerColor(colorToCanvasColor(colorPicker.color))
            }


            if (position.x < 0 || position.x > (width - 1) || position.y < 0 || position.y > (height - 1) || activeLayer.isLocked) return
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
            const clickCode = event.button
            const position = getCanvasRelativePosition(event, scale)

            if (activeTool === colorPicker) {
                if (colorPicker.color === null) return
                setColorPickerColor(colorPicker.color)
                setColorPickerColor(colorToCanvasColor(colorPicker.color))
            }

            if (position.x < 0 || position.x > (width - 1) || position.y < 0 || position.y > (height - 1) || activeLayer.isLocked) {
                previewCanvasContext.clearRect(0, 0, width, height)
            }

            const previousPosition = previousMousePositionRef.current

            if (previousPosition.x !== position.x || previousPosition.y !== position.y) {
                previewCanvasContext.clearRect(0, 0, width, height)
                if (!(position.x > width || position.x < 0 || position.y > height || position.y < 0)) {
                    activeTool.mouseMove(position, brushColor)
                }
                previousMousePositionRef.current = position
                setCanvasCursorPosition(position)
            }
        }

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
    }, [activeTool, setActiveTool, activeLayer, scale, setScale, width, height, brushColor, setBrushColor, colorPickerColor, setColorPickerColor, pushColorToHistory, setCanvasCursorPosition, previewLayerCanvasRef])

    const render = function() {
        const elementWidth = width * scale
        const elementHeight = height * scale

        const canvasStyle = {
            width: `${elementWidth}px`,
            height: `${elementHeight}px`
        }

        return (
            <div className="pixelCanvas" id="pixelCanvas" ref={pixelCanvasRef} style={canvasStyle}>
                {layers.map(layer => (
                    <CanvasLayer
                        key={layer.id} 
                        layer={layer} 
                        width={width} 
                        height={height}
                    />
                ))}
                <PreviewLayer/>
            </div>
        )
    }

    return render()
}