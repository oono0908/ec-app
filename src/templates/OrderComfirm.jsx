import { push } from "connected-react-router"
import React from "react"
import "../assets/Comfirm.css"
import {useDispatch} from "react-redux"


const OrderComfirm = () => {
  const dispatch = useDispatch()
  return(
    <section className="ComfirmWapper">
      <div className="inner">
        <p className="title">注文が完了しました。</p>
        <p className="btn" onClick={() => dispatch(push("/home"))}>ショッピングを続ける</p>
      </div>
    </section>
  
  )
}

export default OrderComfirm