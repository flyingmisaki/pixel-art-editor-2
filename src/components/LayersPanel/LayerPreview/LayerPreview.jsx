import {useState} from "react"
import {BsTrashFill, BsTrash, BsEyeFill, BsEyeSlash, BsLockFill, BsUnlock} from "react-icons/bs";
import {useLayers} from "../../../hooks/useLayers";
import "./LayerPreview.css"

export default function LayerPreview(props) {
    const layer = props.layer

    const {activeLayer, setActiveLayer, removeLayer} = useLayers()

    const isActive = activeLayer?.id === layer.id
    const layerClassName = `layerPreview ${isActive ? "active" : ""}`

    // eslint-disable-next-line
    const [visible, setVisible] = useState(layer.isVisible)
    layer.addUpdateListener(() => setVisible(layer.isVisible))
    // const visibleClassName = `layerActionButton ${visible ? "active" : ""}`

    // eslint-disable-next-line
    const [lock, setLock] = useState(layer.isLocked)
    layer.addUpdateListener(() => setLock(layer.isLocked))
    const lockedClassName = `layerActionButton ${layer.isLocked ? "inactive" : ""}`
    
    return (
        <div className={layerClassName} onClick={() => setActiveLayer(layer)}>
            <div className="previewImage">
            </div>
            <div className="layerPreviewInner">
                <label className="layerPreviewTitle">{layer.name}</label>
                <div>

                    <button 
                        className="layerActionButton"
                        onClick={() => layer.toggleVisibility()}
                    >
                        {layer.isVisible ? <BsEyeFill/> : <BsEyeSlash/>}
                    </button>

                    <button 
                        className="layerActionButton"
                        onClick={() => layer.toggleLock()}
                    >
                        {layer.isLocked ? <BsLockFill/> : <BsUnlock/>}
                    </button>
                    
                    <button 
                        className={lockedClassName}
                        onClick={(e) => {
                            e.stopPropagation()
                            removeLayer(layer)
                        }}
                    >
                        {layer.isLocked ? <BsTrash/> : <BsTrashFill/>}
                    </button>

                </div>
            </div>
        </div>
    )
}