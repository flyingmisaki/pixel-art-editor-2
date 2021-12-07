import {React} from "react"
import "./Workspace.css"
import PixelCanvas from "./PixelCanvas/PixelCanvas"

export default function Workspace(props) {
    const {width, height, scale} = props
    const render = function() {
        return (
            <div className="workspace">
                <PixelCanvas
                    width={width}
                    height={height}
                    scale={scale}
                />
            </div>
        )
    }

    return render()
}