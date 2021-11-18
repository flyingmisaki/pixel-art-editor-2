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

// export default function PixelCanvas(props) {
//     console.log("canvas")
//     const {
//         width, 
//         height, 
//         scale
//     } = props

//     const [activeTool] = useActiveTool()
//     const [brushColor] = useBrushColor("#197D7DFF")

//     const canvasRef = React.useRef(null)

//     const handleMouseDown = function(e) {
//         const canvas = canvasRef.current
        
//         if (canvas === null || activeTool === null) return

//         const canvasContext = canvas.getContext('2d')

//         const mouseX = e.clientX
//         const mouseY = e.clientY

//         const currentX = mouseX - canvas.offsetLeft
//         const currentY = mouseY - canvas.offsetTop

//         const canvasRelativeX = Math.floor(currentX/scale)
//         const canvasRelativeY = Math.floor(currentY/scale)

//         activeTool.mouseDown(canvasContext, canvasRelativeX, canvasRelativeY, brushColor)

//         if(props.onUpdate) props.onUpdate(canvas)
//     }

//     React.useEffect(() => {
//         const canvas = canvasRef.current
        
//         if (canvas === null) return

//         // Set up listeners
//         canvas.addEventListener("mousedown", handleMouseDown)

//         return () => {
            
//             // Tear down listeners
//             canvas.removeEventListener("mousedown", handleMouseDown)
//         }
//     }, [width, 
//         height, 
//         scale, 
//         activeTool, 
//         brushColor])
        
//     const render = function() {

//         const elementWidth = width * scale
//         const elementHeight = height * scale

//         console.log(elementHeight, elementWidth)

//         const canvasStyle = {
//             width: `${elementWidth}px`,
//             height: `${elementHeight}px`
//         }

//         console.log(canvasStyle)
//         return (
//             <canvas
//                 ref={canvasRef}
//                 {...props}
//                 style={canvasStyle}
//             />
//         )
//     }

//     return render()
// }