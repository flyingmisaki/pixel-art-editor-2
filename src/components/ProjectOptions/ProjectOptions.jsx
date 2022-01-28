import React from "react";
import "./ProjectOptions.css"

import LayersPanel from "./LayersPanel/LayersPanel";
import FramesPanel from "./FramesPanel/FramesPanel"
import ExportPanel from "./ExportPanel/ExportPanel";
import SettingsPanel from "./SettingsPanel/SettingsPanel";

export default function ProjectOptions() {
    const render = function() {
        return (
            <div className="ProjectOptions">
                <SettingsPanel/>
                <LayersPanel/>
                <FramesPanel/>
                <ExportPanel/>
            </div>
        )
    }
    
    return render()
}