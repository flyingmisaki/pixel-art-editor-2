import {React, useEffect, useRef} from "react"
import Helmet from "react-helmet"
import './App.css'
// import NavBar from "./components/NavBar/NavBar"
import ToolBox from "./components/ToolBox/ToolBox"
import ProjectOptions from "./components/ProjectOptions/ProjectOptions"
import Workspace from "./components/Workspace/Workspace"
import StatusBar from "./components/StatusBar/StatusBar"

import {BrushColorProvider} from "./hooks/useBrushColor"
import {ActiveToolProvider} from "./hooks/useActiveTool"
import {LayersProvider, useLayers} from "./hooks/useLayers"
import {ProjectSettingsProvider, useProjectSettings} from "./hooks/useProjectSettings"
import { HistoryProvider, useHistory } from "./hooks/useHistory"


function App() {
	const {width, height, scale} = useProjectSettings()
	const {pushEntryToHistory} = useHistory()
	const {layers} = useLayers()

	const isHistoryInitialised = useRef(false)

	useEffect(() => {
		window.addEventListener('contextmenu', function(e) {e.preventDefault()}, false)
	}, [])

	useEffect(() => {
        if (!isHistoryInitialised.current && layers.length > 0) {
			pushEntryToHistory()
			isHistoryInitialised.current = true
		}
    }, [layers, pushEntryToHistory])
	
  	const render = function() {
    	return (
      		<div className="App">
				<Helmet>
					<title>pxl.it</title>
					<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
				</Helmet>

				{/* <NavBar/> */}
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
						<HistoryProvider>
							<App/>
						</HistoryProvider>
					</ProjectSettingsProvider>
				</LayersProvider>
			</BrushColorProvider>
		</ActiveToolProvider>
	)
}