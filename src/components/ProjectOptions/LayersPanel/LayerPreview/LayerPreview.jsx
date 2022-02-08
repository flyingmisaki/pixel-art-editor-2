import {useEffect, useState, useRef} from "react"
import {BsTrashFill, BsTrash, BsEyeFill, BsEyeSlash, BsLockFill, BsUnlock} from "react-icons/bs";
import {useLayers} from "../../../../hooks/useLayers";
import "./LayerPreview.css"

import {copyCanvasContents} from "../../../../core/utils/canvas";
import { useProjectSettings } from "../../../../hooks/useProjectSettings";

export default function LayerPreview(props) {
    const layer = props.layer

    const {activeLayer, setActiveLayer, removeLayer} = useLayers()
    
    const {width, height} = useProjectSettings()

    const previewCanvasRef = useRef(null)

    // eslint-disable-next-line
    const [visible, setVisible] = useState(layer.isVisible)
    // eslint-disable-next-line
    const [lock, setLock] = useState(layer.isLocked)

    const [name, setName] = useState(layer.name)

    const isActive = activeLayer?.id === layer.id
    const layerClassName = `LayerPreview ${isActive ? "active" : ""}`

    useEffect(() => {
        const layerCanvas = layer.canvasRef.current
        const previewCanvas = previewCanvasRef.current

        const updatePreview = function() {
            copyCanvasContents(layerCanvas, previewCanvas)
            setVisible(layer.isVisible)
            setLock(layer.isLocked)
            setName(layer.name)
        }

        layer.addUpdateListener(updatePreview)

        return () => {
            layer.removeUpdateListener(updatePreview)
        }

    }, [layer])
    
    // const visibleClassName = `layerActionButton ${visible ? "active" : ""}`

    const lockedClassName = `layerActionButton ${layer.isLocked ? "inactive" : ""}`
    
    return (
        <div className={layerClassName} onClick={() => {setActiveLayer(layer)}}>
            <div className="previewImage">
                <canvas className={height > width ? "portrait" : "landscape"}
                    ref={previewCanvasRef}
                    key={layer.id}
                    width={width}
                    height={height}
                />
            </div>
            <div className="layerPreviewInner">
                <input className="layerPreviewTitle" type="text" value={name} onChange={(event) => layer.setName(event.target.value)}/>
                <div>
                    <button 
                        className="layerActionButton"
                        onClick={() => layer.toggleVisibility()}
                    >
                        {visible ? <BsEyeFill/> : <BsEyeSlash/>}
                    </button>
                    <button 
                        className="layerActionButton"
                        onClick={(e) => {
                            e.stopPropagation()
                            layer.toggleLock()
                        }}
                    >
                        {lock ? <BsLockFill/> : <BsUnlock/>}
                    </button>
                    <button 
                        className={lockedClassName}
                        onClick={(e) => {
                            e.stopPropagation()
                            removeLayer(layer)
                        }}
                    >
                        {lock ? <BsTrash/> : <BsTrashFill/>}
                    </button>
                </div>
            </div>
        </div>
    )
}