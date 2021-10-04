import React from "react"
import "./ExportCanvas.css"
import { saveAs } from "file-saver"

export default function ExportCanvas() {
    const canvasRef = React.useRef(null)

    const exportImage = function() {
		if(!canvasRef.current) return
		const imageUrl = canvasRef.current.toDataURL("image/png")
		console.log("Exported to url: ", imageUrl)
		saveAs(imageUrl, "export.png")
	}

    const render = function() {
        return(
            <button onClick={exportImage}>Export!</button>
        )
    }

    return render()
}

