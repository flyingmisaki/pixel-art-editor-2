// Returns canvas x, y coord object
export function getCanvasRelativePosition(mouseEvent, pixelCanvasRef, scale) {
    const mouseX = mouseEvent.clientX
    const mouseY = mouseEvent.clientY
    const pixelCanvasElement = pixelCanvasRef.current
    
    const currentX = mouseX - pixelCanvasElement.offsetLeft
    const currentY = mouseY - pixelCanvasElement.offsetTop
    
    return ({
        x : Math.floor(currentX/scale),
        y : Math.floor(currentY/scale)
    })
}