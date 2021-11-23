import {BsTrashFill, BsEyeFill, BsLockFill} from "react-icons/bs";
import {useLayers} from "../../../hooks/useLayers";

export default function LayerPreview(props) {
    const layer = props.layer

    const {activeLayer, setActiveLayer, removeLayer} = useLayers()

    const isActive = activeLayer?.id === layer.id

    const className = `layerPreview ${isActive ? "active" : ""}`

    return (
        <div className={className} onClick={() => setActiveLayer(layer)}>
            <div className="previewImage">
            </div>
            <div className="layerPreviewInner">
                <label className="layerPreviewTitle">{layer.name}</label>
                <div>
                    <button className="layerActionButton"><BsEyeFill/></button>
                    <button className="layerActionButton"><BsLockFill/></button>
                    <button 
                        className="layerActionButton"
                        onClick={(e) => {
                            e.stopPropagation()
                            removeLayer(layer)
                        }}
                    >
                        <BsTrashFill/>
                    </button>
                </div>
            </div>
        </div>
    )
}