import { useState } from "react"
import {BsCaretLeft, BsCaretDownFill} from "react-icons/bs"

import "./OptionWindow.css"

export default function OptionWindow(props) {
    // eslint-disable-next-line
    const title = props.title
    const onExpand = props.onExpand ?? (() => {})
    const onCollapse = props.onCollapse ?? (() => {})

    const [expanded, setExpanded] = useState(true)

    function collapse() {
        setExpanded(false)
        onCollapse()
    }

    function expand() {
        setExpanded(true)
        onExpand()
    }

    function renderExpandButton() {
        if (expanded) return <button onClick={collapse}><BsCaretDownFill/></button>
        return <button onClick={expand}><BsCaretLeft/></button>
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