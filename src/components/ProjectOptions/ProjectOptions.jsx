import React from "react";
import "./ProjectOptions.css"

import LayersPanel from "./LayersPanel/LayersPanel";
import FramesPanel from "./FramesPanel/FramesPanel"

export default function ProjectOptions() {

    const render = function() {
        return (
            <div className="ProjectOptions">
                <LayersPanel/>
                <FramesPanel/>
            </div>
        )
    }
    
    return render()
}