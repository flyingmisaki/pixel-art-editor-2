import React from "react"
import "./NavBar.css"

export default function NavBar() {
    const render = function() {
        return (
            <button className="navBar">
                <button>Logo</button>
                <button>File</button>
                <button>Edit</button>
                <button>Selection</button>
                <button>View</button>
            </button>
            
        )
    }

    return render()
}