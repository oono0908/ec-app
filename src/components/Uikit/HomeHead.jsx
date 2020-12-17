import React from "react";


const HomeHead = (props) => {
  return (
   <li className="HomeHeadItem" onClick={(e) => props.onClick(e,props.value)}>
     {props.title}
   </li>
  )
}

export default HomeHead