// Returns canvas x, y coord object
export function getCanvasRelativePosition(mouseEvent, scale) {
    const mouseX = mouseEvent.offsetX
    const mouseY = mouseEvent.offsetY
    
    // const currentX = mouseX - pixelCanvasElement.offsetLeft
    // const currentY = mouseY - pixelCanvasElement.offsetTop
    
    return ({
        x : Math.floor(mouseX/scale),
        y : Math.floor(mouseY/scale)
    })
}