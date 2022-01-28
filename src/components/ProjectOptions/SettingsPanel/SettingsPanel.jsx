import { useProjectSettings } from "../../../hooks/useProjectSettings"
import OptionWindow from "../../common/OptionWindow/OptionWindow"

import "./SettingsPanel.css"

export default function SettingsPanel() {
    const {width, setWidth, height, setHeight, scale, setScale} = useProjectSettings()


    const render = function() {
        return (
            <OptionWindow title="Settings">
                <div className="settingsCategory">Canvas Settings:</div>
                <div className="settings">
                    <div className="setting">
                        <input type="number" id="widthSetting" className="widthSettingInput" value={width} onChange={(event) => setWidth(event.target.value)}/>
                        <label htmlFor="widthSetting" className="widthSettingLabel">Width: </label>
                    </div>
                    <div className="setting">
                        <input type="number" id="heightSetting" className="heightSettingInput" value={height} onChange={(event) => setHeight(event.target.value)}/>
                        <label htmlFor="heightSetting" className="heightSettingLabel">Height: </label>
                    </div>
                    <div className="setting">
                        <input type="number" id="scaleSetting" className="scaleSettingInput" value={scale} onChange={(event) => setScale(event.target.value)}/>
                        <label htmlFor="scaleSetting" className="scaleSettingLabel">Scale: </label>
                    </div>
                </div>
            </OptionWindow>
        )
    }
    return render()
}