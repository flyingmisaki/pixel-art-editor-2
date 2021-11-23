import React from "react"
import './App.css'
import NavBar from "./components/NavBar/NavBar"
import ToolBox from "./components/ToolBox/ToolBox"
import LayersPanel from "./components/LayersPanel/LayersPanel"
import PixelCanvas from "./components/PixelCanvas/PixelCanvas"
import StatusBar from "./components/StatusBar/StatusBar"

// import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch"

// import ExportCanvas from "./components/ExportCanvas/ExportCanvas"

import {BrushColorProvider} from "./hooks/useBrushColor"
import {ActiveToolProvider} from "./hooks/useActiveTool"
import {LayersProvider} from "./hooks/useLayers"

function App() {
	const canvasRef = React.useRef(null)

  	const render = function() {
    	return (
      		<div className="App">
				
				<div className="navBar">
					<NavBar/>
				</div>
				
				<div className="editor">
					
					<div className="leftPanel">
						<ToolBox/>
					</div>

					<div className="workspace">
						<PixelCanvas
							width={16}
							height={16}
							scale={50}
							onUpdate={(canvas) => canvasRef.current = canvas}
						></PixelCanvas>
					</div>

					<div className="rightPanel">
						<LayersPanel/>
					</div>

					{/* <div className="ExportCanvas">
						<button className="ExportButton" onClick={exportImage}>Export!</button>
					</div> */}
					
				</div>

				<div className="statusBar">
					<StatusBar/>
				</div>
				
      		</div>
    	)
  	}

  	return render()
}

export default function AppWithContext() {
	return (
		<ActiveToolProvider>
			<BrushColorProvider>
				<LayersProvider>
					<App/>
				</LayersProvider>
			</BrushColorProvider>
		</ActiveToolProvider>
	)
}