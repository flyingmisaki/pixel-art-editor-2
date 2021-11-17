import {BsStar} from "react-icons/bs"

class Shapes {
    constructor() {
        this.name = "Shapes"
    }

    renderIcon() {
        return <BsStar/>
    }

    mouseDown(context, x, y, color) {
    }
}

export default new Shapes()