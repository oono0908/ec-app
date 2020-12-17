import React,{useMemo,useCallback} from "react"
import {CartPriceList} from "./"
import {orderProduct} from "../../reducks/products/operations"
import {useDispatch, useSelector} from "react-redux";
import {getIsSignedIn} from "../../reducks/users/selectors"
import {push} from "connected-react-router"

const ProductTotalPrice = (props) => {
  const products = props.product
  const quantity = products.length
  const dispatch = useDispatch()

  const subtotal = useMemo(()=> {
    return products.reduce((sum,product) => sum += product.price,0)
  },[products])

  const shippingFee = (subtotal >= 10000) ? 0 : 210;
  const tax = Math.round(subtotal * 0.1)
  const total = tax + shippingFee + subtotal

  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector)
  
  const order = useCallback(() => {
    if (isSignedIn == ""){
      const ret = window.confirm('注文するにはには会員登録するか、ログインする必要があります。')
      if (!ret){
        return false
      } else {
        dispatch(push("/signin"))
        return
      }
    } else if (quantity == 0){
      const ret = window.confirm('カートは空です。商品掲載ページへ戻りますか？')
      if(!ret) {
        return false
      } else {
        dispatch(push("/home"))
        return
      }
    } 

    dispatch(orderProduct(products))
  },[products])
  return(
    <div>
   <ul className="priceWrapper">
     <CartPriceList  className={"priceLeft"}value={quantity} title={"注文内容"} price={false}/>
      <CartPriceList value={subtotal} title={"合計金額"} price={true}/>
      <CartPriceList value={shippingFee} title={"送料"} price={true}/>
      <CartPriceList value={subtotal} title={"小計"} price={true}/>
      <CartPriceList value={tax} title={"消費税"} price={true}/>
      <CartPriceList className={"priceLeft"} value={total} title={"合計(税込み)"} price={true}/>
   </ul>
   <div className="orderBtn" onClick={order}>注文する</div>
   </div>
  )
}

export default ProductTotalPrice