import React from "react"
import {getProductsInCart} from "../reducks/users/selectors";
import {useSelector} from "react-redux";
import {CartListItem,ProductTotalPrice} from "../components/Products"
import "../assets/Cart.css";


const Cart = () => {
  const selector = useSelector(state => state);
  const productsInCart = getProductsInCart(selector)


  return(
    <section className="cartGlobal">
      <h2 className="cartTitle">カート</h2>
      <div className="cartWrapper">
        <ul className="cartLeft">
          {productsInCart.length > 0 && (
            productsInCart.map(product => <CartListItem key={product.cartId} product={product}/>)
          )}
        </ul>
        <div className="cartRight">
          <ProductTotalPrice product={productsInCart}/>
        </div>
      </div>
     </section>
  
  )
}

export default Cart