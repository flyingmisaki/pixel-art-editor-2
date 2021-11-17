import React from "react";
import "./Layers.css"

export default function Layers() {

    const render = function() {
        return (
            <div className="Layers">
                <div className="mockuplayer">[preview] Layer 1</div>
                <div className="mockuplayer">[preview] Layer 2</div>
                <div className="mockuplayer">[preview] Layer 3</div>
            </div>
        )
    }

    return render()
}