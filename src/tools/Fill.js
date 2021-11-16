import {BsPaintBucket} from "react-icons/bs"

class Fill {
    constructor() {
        this.name = "Fill"
    }

    renderIcon() {
        return <BsPaintBucket/>
    }

    mouseDown(context, x, y, color) {
    }
}

export default new Fill()