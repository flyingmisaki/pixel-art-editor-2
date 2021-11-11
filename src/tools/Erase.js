class Erase {
    constructor() {
        this.name = "Erase"
    }

    erasePixel(context, x, y) {
        console.log(`Erasing pixel at ${x},${y}`)
        context.clearRect(x, y, 1, 1)
    }

    mouseDown(context, x, y) {
        this.erasePixel(context, x, y)
    }
}

export default new Erase()