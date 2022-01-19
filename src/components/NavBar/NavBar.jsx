import React from "react"
import "./NavBar.css"

export default function NavBar() {
    const render = function() {
        return (
            <div className="navBar">
                <div>Logo</div>
                <div>File</div>
                <div>Edit</div>
                <div>Selection</div>
                <div>View</div>
            </div>
            
        )
    }

    return render()
}