import {React} from "react"
import './App.css'
import NavBar from "./components/NavBar/NavBar"
import ToolBox from "./components/ToolBox/ToolBox"
import ProjectOptions from "./components/ProjectOptions/ProjectOptions"
import Workspace from "./components/Workspace/Workspace"
import StatusBar from "./components/StatusBar/StatusBar"

// import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch"

import {BrushColorProvider} from "./hooks/useBrushColor"
import {ActiveToolProvider} from "./hooks/useActiveTool"
import {LayersProvider} from "./hooks/useLayers"
import {ProjectSettingsProvider, useProjectSettings} from "./hooks/useProjectSettings"


function App() {
	const {width, height, scale} = useProjectSettings()
	
  	const render = function() {
    	return (
      		<div className="App">
				<NavBar/>
				<div className="editor">
					<ToolBox/>
					<Workspace
						width={width}
						height={height}
						scale={scale}
					/>
					<ProjectOptions/>
				</div>
				<StatusBar/>
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
					<ProjectSettingsProvider>
						<App/>
					</ProjectSettingsProvider>
				</LayersProvider>
			</BrushColorProvider>
		</ActiveToolProvider>
	)
}