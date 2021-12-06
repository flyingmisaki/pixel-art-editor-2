import {React} from "react"
import "./Workspace.css"
import PixelCanvas from "./PixelCanvas/PixelCanvas"

export default function Workspace() {

    const render = function() {
        return (
            <div className="workspace">
                <PixelCanvas
                    width={16}
                    height={16}
                    scale={50}
                />
            </div>
        )
    }

    return render()
}