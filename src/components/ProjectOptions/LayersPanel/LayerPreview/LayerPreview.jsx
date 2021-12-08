import {useEffect, useState, useRef} from "react"
import {BsTrashFill, BsTrash, BsEyeFill, BsEyeSlash, BsLockFill, BsUnlock} from "react-icons/bs";
import {useLayers} from "../../../../hooks/useLayers";
import "./LayerPreview.css"

function copyCanvasContents(sourceCanvas, destinationCanvas) {
    const destinationContext = destinationCanvas.getContext('2d')
    destinationContext.clearRect(0, 0, destinationCanvas.width, destinationCanvas.height)
    destinationContext.drawImage(sourceCanvas, 0, 0)
}

export default function LayerPreview(props) {
    const layer = props.layer

    const {activeLayer, setActiveLayer, removeLayer, name, setName} = useLayers()

    const previewCanvasRef = useRef(null)

    // eslint-disable-next-line
    const [visible, setVisible] = useState(layer.isVisible)
    // eslint-disable-next-line
    const [lock, setLock] = useState(layer.isLocked)

    const isActive = activeLayer?.id === layer.id
    const layerClassName = `LayerPreview ${isActive ? "active" : ""}`

    useEffect(() => {
        const layerCanvas = layer.canvasRef.current
        const previewCanvas = previewCanvasRef.current

        layer.addUpdateListener(() => {
            copyCanvasContents(layerCanvas, previewCanvas)
            setVisible(layer.isVisible)
            setLock(layer.isLocked)
        })

        // return listener remover

    }, [layer])
    
    // const visibleClassName = `layerActionButton ${visible ? "active" : ""}`

    const lockedClassName = `layerActionButton ${layer.isLocked ? "inactive" : ""}`
    
    return (
        <div className={layerClassName} onClick={() => setActiveLayer(layer)}>
            <div className="previewImage">
                <canvas
                    ref={previewCanvasRef}
                    width={layer.width}
                    height={layer.height}
                />
            </div>
            <div className="layerPreviewInner">
                {/* <label className="layerPreviewTitle">{layer.name}</label> */}
                <input className="layerPreviewTitle" type="text" value={layer.name} onChange={(event) => setName(event.target.value)}/>
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