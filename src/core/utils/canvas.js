export function copyCanvasContents(sourceCanvas, destinationCanvas, clear = true) {
    // console.log("copying canvas")
    const destinationContext = destinationCanvas.getContext('2d')
    if (clear) destinationContext.clearRect(0, 0, destinationCanvas.width, destinationCanvas.height)
    destinationContext.drawImage(sourceCanvas, 0, 0)
}

export function clearCanvas(canvas) {
    // console.log("clearing canvas")
    const canvasContext = canvas.getContext("2d")
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
}