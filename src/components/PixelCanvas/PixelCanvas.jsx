import React from "react"
import './PixelCanvas.css'

export default function PixelCanvas(props) {
    console.log("canvas")
    const {
        width, 
        height, 
        scale, 
        activeTool, 
        brushColor
    } = props
    console.log(activeTool)

    const canvasRef = React.useRef(null)

    const handleMouseDown = function(e) {
        const canvas = canvasRef.current
        
        if (canvas === null || activeTool === null) return

        const canvasContext = canvas.getContext('2d')


        const mouseX = e.clientX
        const mouseY = e.clientY

        const currentX = mouseX - canvas.offsetLeft
        const currentY = mouseY - canvas.offsetTop

        const canvasRelativeX = Math.floor(currentX/scale)
        const canvasRelativeY = Math.floor(currentY/scale)

        console.log(activeTool)
        activeTool.mouseDown(canvasContext, canvasRelativeX, canvasRelativeY, brushColor)

        if(props.onUpdate) props.onUpdate(canvas)
    }

    React.useEffect(() => {
        const canvas = canvasRef.current
        
        if (canvas === null) return

        // Set up listeners
        canvas.addEventListener("mousedown", handleMouseDown)

        return () => {
            
            // Tear down listeners
            canvas.removeEventListener("mousedown", handleMouseDown)
        }
    }, [width, 
        height, 
        scale, 
        activeTool, 
        brushColor])
    
    const render = function() {

        const elementWidth = width * scale
        const elementHeight = height * scale

        console.log(elementHeight, elementWidth)

        const canvasStyle = {
            width: `${elementWidth}px`,
            height: `${elementHeight}px`
        }

        console.log(canvasStyle)
        return (
            <canvas
                ref={canvasRef}
                {...props}
                style={canvasStyle}
            />
        )
    }

    return render()
}