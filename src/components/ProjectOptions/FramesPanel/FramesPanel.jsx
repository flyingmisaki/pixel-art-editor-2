import React from "react";
import "./FramesPanel.css"

import OptionWindow from "../../common/OptionWindow/OptionWindow";

export default function LayersPanel() {

    const render = function() {
        return (
            <OptionWindow title="Frames">
                <div className="FramesPanel">
                    Frames
                </div>
            </OptionWindow>
        )
    }
    
    return render()
}