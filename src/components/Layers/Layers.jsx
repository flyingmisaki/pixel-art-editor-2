import React from "react";
import "./Layers.css"

export default function Layers() {

    const render = function() {
        return (
            <div className="Layers">
                <div className="mockuplayer">Layer 1</div>
                <div className="mockuplayer">Layer 2</div>
                <div className="mockuplayer">Layer 3</div>
            </div>
        )
    }

    return render()
}