import React from "react";
import {useHistory} from "react-router"


const HomeSearch = (props) => {
let query = "";
  if (props.category == "MEN"){
    query = "male"
  } else if (props.category == "WOMEN"){
    query = "female"
  } else if (props.category == "KIDs") {
    query = "kids"
  }

  const tops = "?gender=" + query + "-tops"
  const shirts = "?gender=" + query + "-shirts"
  const pants = "?gender=" + query + "-pants"
  const jacket = "?gender=" + query + "-jacket"
  const watch = "?gender=" + query + "-watch"

  const history = useHistory();
  const path = history.location.pathname.split("/")[1]
  const url = /(signin$|signup$|^product\/edit|^products|^cart|^ordercomfirm)/.test(path) ? false:true

  const close = () => {
    props.setOpen(false)
  }
  return (
    <>
      {url && (
      <div className={props.className}>
        <div className="HomeSearchWapper">
          <div style={{display:"flex",justifyContent:"space-between",cursor:"pointer"}}>
            <p style={{fontSize: "18px",fontWeight:"bold",marginTop:"10px"}}>{props.gender}</p>
            <p style={{fontSize: "12px",fontWeight:"bold",marginTop:"10px"}}className="closeBtn" onClick={close}>×<span>閉じる</span></p>
          </div>
          <div className="HomeSearchInner"style={{marginTop:"10px"}}>
            <p className="HomeSearchTitle" onClick={() => props.onClick(tops)}>{props.tops}</p>
            <p className="HomeSearchTitle" onClick={() =>props.onClick(shirts)}>{props.shirts}</p>
            <p className="HomeSearchTitle" onClick={() =>props.onClick(pants)}>{props.pants}</p>
            <p className="HomeSearchTitle" onClick={() =>props.onClick(jacket)}>{props.jacket}</p>
            <p className="HomeSearchTitle" onClick={() =>props.onClick(watch)}>{props.wacth}</p>
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default HomeSearch