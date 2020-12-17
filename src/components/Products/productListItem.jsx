import React from "react"
import {getUserId} from "../../reducks/users/selectors";
import {useSelector} from "react-redux";
import {db} from "../../firebase/index"

const CartListItem = (props) => {
  const selector = useSelector((state) => state);
  const image = props.product.images[0].path
  const price = props.product.price.toLocaleString()
  const uid = getUserId(selector)

  const removeProductFromCart = (id) => {
    return db.collection("users").doc(uid)
            .collection("cart").doc(id)
            .delete()
  }

  return(
   <li className="itemWapper">
     <div className="iteminner">
       <img className="image"src={image} alt="商品画像"/>
     </div>
     <div className="iteminner">
       <ul className="detail">
         <li className="name">{props.product.name}</li>
         <p className="marginTop"></p>
         <li>カラー:{props.product.color}</li>
         <p className="marginTop"></p>
         <li>価格:{price}</li>
       </ul>
       <p className="marginTop"></p>
       <p className="removeBtn"onClick={()=>removeProductFromCart(props.product.cartId)}>削除</p>
     </div>
     <ul className="iteminner">
       <li>数量:{props.product.quantity}</li>
       <p className="marginTop"></p>
       <li className="price">小計:￥{price}</li>
     </ul>
   </li>
  )
}

export default CartListItem