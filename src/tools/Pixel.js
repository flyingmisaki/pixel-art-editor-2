class Pixel {
    constructor() {
        this.name = "Pixel"
    }

    drawPixel(context, x, y, color) {
        console.log(`Drawing pixel at ${x},${y}`)
        context.fillStyle = color
        context.fillRect(x, y, 1, 1)
    }

    mouseDown(context, x, y, color) {
        this.drawPixel(context, x, y, color)
    }
}

export default new Pixel()