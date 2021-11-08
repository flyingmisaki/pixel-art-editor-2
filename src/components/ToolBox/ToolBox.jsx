import React from "react";
import "./ToolBox.css"

export default function ToolBox() {

    const render = function() {
        return (
            <div className="toolBox">
                <div className="toolBar">
                    <button>Pixel</button>
                    <button>Line</button>
                    <button>Shape</button>
                    <button>Fill</button>
                    <button>Pick</button>
                </div>
                <div className="toolOptions">
                    <div>ayy</div>
                    <div>whsats</div>
                    <div>upppp</div>
                </div>
            </div>
        )
    }

    return render()
}