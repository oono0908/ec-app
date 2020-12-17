import React from "react"


const cartPriceList = (props) => {
 const classname = props.className == "priceLeft" ? "itemMainPriceWapper":"itemPriceWrapper"
  return(
    <li className={classname}>
      <p className={props.className}>{props.title}</p>
      <p className="priceRight">{props.price ? ("￥" + props.value):(props.value + "件")}</p>
    </li>
  )
}

export default cartPriceList