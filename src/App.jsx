import React from "react"
import './App.css'
import TitleBar from "./components/TitleBar/TitleBar"
import ToolBar from "./components/ToolBar/ToolBar"
import PixelCanvas from "./components/PixelCanvas/PixelCanvas"
// import ExportCanvas from "./components/ExportCanvas/ExportCanvas"
import { ChromePicker } from "react-color"
import { saveAs } from "file-saver"

function App() {
	const [brushColor, setBrushColor] = React.useState("#00ffff")
	const canvasRef = React.useRef(null)

	const exportImage = function() {
		if(!canvasRef.current) return
		const imageUrl = canvasRef.current.toDataURL("image/png")
		console.log("Exported to url: ", imageUrl)
		saveAs(imageUrl, "export.png")
	}

  	const render = function() {
    	return (
      		<div className="App">
				<div className="TitleBar">
					<TitleBar></TitleBar>
				</div>
				
				<div className="Workspace">
					
					<div className="ToolBar">
						<ToolBar></ToolBar>
					</div>

					<div className="ColorPicker">
						<ChromePicker
							color={brushColor}
							onChangeComplete={(color) => setBrushColor(color.hex)}
						></ChromePicker>
					</div>

					<div className="PixelCanvas">
						<PixelCanvas
							width={16}
							height={16}
							scale={50}
							brushColor={brushColor}
							onUpdate={(canvas) => canvasRef.current = canvas}
						></PixelCanvas>
					</div>

					<div className="ExportCanvas">
						<button className="ExportButton" onClick={exportImage}>Export!</button>
						{/* <ExportCanvas></ExportCanvas> */}
					</div>
					
				</div>
				
      		</div>
    	)
  	}

  	return render()
}

export default App;