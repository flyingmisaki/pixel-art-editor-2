import { useState } from "react"
import {BsCaretLeft, BsCaretDownFill} from "react-icons/bs"

import "./OptionWindow.css"

export default function OptionWindow(props) {
    // eslint-disable-next-line
    const title = props.title

    const [expanded, setExpanded] = useState(true)

    function renderExpandButton() {
        if (expanded) return <button onClick={() => setExpanded(false)}><BsCaretDownFill/></button>
        return <button onClick={() => setExpanded(true)}><BsCaretLeft/></button>
    }

    const render = function(){
        return (
            <div className="optionWindow">
                <div className="titleBar">
                    <h2 className="title">{props.title}</h2>
                    {renderExpandButton()}
                </div>
                {expanded ? props.children : null}
            </div>
        )
    }

    return render()
}