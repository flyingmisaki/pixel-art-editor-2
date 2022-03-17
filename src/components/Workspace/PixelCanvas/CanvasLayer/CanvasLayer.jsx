import {useEffect, useRef, useState} from "react"
import "./CanvasLayer.css"

export default function CanvasLayer(props) {
    const {layer, width, height} = props

    const canvasLayerRef = useRef(null)
    layer.canvasRef = canvasLayerRef

    const [visible, setVisible] = useState(layer.isVisible)
    // const [mounted, setMounted] = useState(false)

    useEffect(() => {
        function onUpdate() {
            setVisible(layer.isVisible)
        }

        layer.addUpdateListener(onUpdate)

        return () => {
            layer.removeUpdateListener(onUpdate)
        }
    }, [layer])

    // useEffect(() => {
    //     setMounted(true)
    // }, [mounted])

    const render = function() {
        const className = `canvasLayer ${visible ? "" : "hidden"}`

        return (
            <div className={className}>
                {/* {layer.id === activeLayer.id ? <h2 style={{position : "absolute"}}>{layer.name}</h2> : null} */}
                <canvas 
                    ref={canvasLayerRef}
                    width={width}
                    height={height}
                />
            </div>
        )
    }

    return render()
}