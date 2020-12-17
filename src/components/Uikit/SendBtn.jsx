import React from "react";


const SendBtn = (props) => {
  return (
    <button className="sendBtn" onClick={props.onClick}>{props.name}</button>
  )
}

export default SendBtn