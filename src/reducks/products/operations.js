import {db,FirebaseTimestamp} from "../../firebase"
import {push} from "connected-react-router";
import {deleteProductsAction,fetchProductsAction} from "./actions"
const productsRef = db.collection("products")

export const fetchProducts = (gender,genderCategory) => {

  return async (dispatch) => {
    const gender1 = genderCategory.gender
    const type = genderCategory.type
    let query = productsRef.orderBy("updated_at","desc")
      query = (gender !== "" && gender !== "all" ) ? query.where("gender","==",gender) : query
    //  query = (gender == "" && genderCategory == "") ? query : query
    //   query = (genderCategory !== "" && gender == "") ? query.where("gender","==",gender1).where("category", "==",type) : query
     
    
    query.get()
      .then(snapshots => {
        const productList = []
        snapshots.forEach(snapshot => {
          const product =  snapshot.data()
          productList.push(product)
        })
        dispatch(fetchProductsAction(productList))
      })
  }
}



export const orderProduct = (productsInCart) => {
  return async (dispatch,getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection("users").doc(uid)
    const timestamp = FirebaseTimestamp.now();
    
    let products = []
    
    const batch = db.batch();
    let quantity = 0
    for (const product of productsInCart) {
    
      products[product.cartId] = {
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size
      }
      
      quantity += 1
      batch.delete(
        userRef.collection("cart").doc(product.cartId)
      )
    }
      batch.commit()
        .then(() => {
          const orderRef = userRef.collection("orders").doc();
          const date = timestamp.toDate()
          const history = {
            created_at: date,
            id: orderRef.id,
            products: products,
            updated_at:date
          }
          
          orderRef.set(history)
          const payload = {
            text: "userId:" + uid + "から" + quantity + "件の注文がありました。"
          }
          const url = "https://hooks.slack.com/services/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"
          fetch(url,{
            method:"POST",
            body:JSON.stringify(payload)
          }).then(()=>{
            return
          })
          dispatch(push("/ordercomfirm"))
          
        }).catch(() => {
          alert("注文処理に失敗しました。通信環境をご確認の上、再度お試しください")
          return false
        })
  }
}

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete()
    .then(() => {
      const prevProducts = getState().products.list
      const nextProducts = prevProducts.filter(product => product.id !== id)
      dispatch(deleteProductsAction(nextProducts))
  })
  }
}

export const saveProduct = (id,name, description, category, gender, price,images) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      name: name,
      price: parseInt(price,10),
      gender: gender,
      updated_at: timestamp,
      images: images
    }
  if (id === ""){
    const ref = productsRef.doc()
          id = ref.id
          data.id = id
          data.created_at = timestamp
  }
    return productsRef.doc(id).set(data,{merge: true})
      .then(() => {
        dispatch(push("/home"))
      }).catch((error) => {
        throw new Error(error)
      })
  }
}