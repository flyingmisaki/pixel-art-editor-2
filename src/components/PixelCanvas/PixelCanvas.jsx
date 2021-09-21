import React from "react"
import './PixelCanvas.css'

export default function PixelCanvas(props) {
    console.log("canvas")
    const canvasRef = React.useRef(null)
    const width = props.width
    const height = props.height
    const scale = props.scale
    const brushColor = props.brushColor


    const drawPixel = function(context, x, y, color) {
        console.log(`Drawing pixel at ${x},${y}`)
        context.fillStyle = color
        context.fillRect(x, y, 1, 1)
    }

    React.useEffect(() => {
        const canvas = canvasRef.current
        console.log("canvas updated!")
        if (canvas === null) return

        console.log("setting up listeners!")

        const canvasContext = canvas.getContext('2d')

        const handleMouseDown = function(e) {
            console.log("Mousedown!")
            
            const mouseX = e.clientX
            const mouseY = e.clientY
    
            const currentX = mouseX - canvas.offsetLeft
            const currentY = mouseY - canvas.offsetTop

            const canvasRelativeX = Math.floor(currentX/scale)
            const canvasRelativeY = Math.floor(currentY/scale)

            
            drawPixel(canvasContext, canvasRelativeX, canvasRelativeY, brushColor)

            if(props.onUpdate) props.onUpdate(canvas)
        }
        
        // Set up listeners
        canvas.addEventListener("mousedown", handleMouseDown)

        return () => {
            
            // Tear down listeners
            console.log("cleaning up!")
            canvas.removeEventListener("mousedown", handleMouseDown)
        }
    }, [scale, brushColor])
    
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
        />)
    }

    return render()
}