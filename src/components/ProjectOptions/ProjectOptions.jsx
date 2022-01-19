import React from "react";
import "./ProjectOptions.css"

import LayersPanel from "./LayersPanel/LayersPanel";
import FramesPanel from "./FramesPanel/FramesPanel"
import ExportPanel from "./ExportPanel/ExportPanel";

export default function ProjectOptions() {
    const render = function() {
        return (
            <div className="ProjectOptions">
                <LayersPanel/>
                <FramesPanel/>
                <ExportPanel/>
            </div>
        )
    }
    
    return render()
}