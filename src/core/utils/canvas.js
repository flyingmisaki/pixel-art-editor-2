export function copyCanvasContents(sourceCanvas, destinationCanvas, clear = true) {
    const destinationContext = destinationCanvas.getContext('2d')
    if (clear) destinationContext.clearRect(0, 0, destinationCanvas.width, destinationCanvas.height)
    destinationContext.drawImage(sourceCanvas, 0, 0)
}

export function clearCanvas(canvas) {
    const canvasContext = canvas.getContext("2d")
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
}