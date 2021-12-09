import {React} from "react"
import "./Workspace.css"
import PixelCanvas from "./PixelCanvas/PixelCanvas"

export default function Workspace() {
    const render = function() {
        return (
            <div className="workspace">
                <PixelCanvas/>
            </div>
        )
    }

    return render()
}