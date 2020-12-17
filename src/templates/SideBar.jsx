import React from "react"
import "../assets/SideBar.css"



const SideBar = (props) => {
  return(
    <div className="sideBar" onClick={() => props.menuChange(props.openMenu,props.value)}>
      <p>{props.name}</p>
    </div>
  )
}

export default SideBar