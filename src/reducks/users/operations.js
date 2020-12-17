import {signInAction,fetchProductsInCartAction} from "./actions";
import {signOutAction} from "./actions";
import {push} from "connected-react-router";
import {auth, db, FirebaseTimestamp} from "../../firebase/index.js";


// export const listenAuthState = () => {
//   return async (dispatch) => {
//       return auth.onAuthStateChanged(user => {
//           if (user) {
//             const uid = user.uid
//             db.collection("users").doc(uid).get()
//               .then(snapshot => {
//               const data = snapshot.data()
  
//               dispatch(signInAction({
//                 isSignedIn: true,
//                 role: data.role,
//                 uid: uid,
//                 username: data.username,
//                 addres: data.addres,
//                 postNumber: data.postNumber
//               }))
//               dispatch(push("/"))
//             })
//              } else {
//               dispatch(push('./signin'))
//           }
//       })
//   }
// };


export const addProductToCart = (addedProduct) => {
  return async (dispatch,getState) => {
    const uid = getState().users.uid;
    const cartRef = db.collection("users").doc(uid).collection("cart").doc();
    addedProduct["cartId"] = cartRef.id
    await cartRef.set(addedProduct)
  }
}

export const fetchProductsInCart = (products) =>{
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(products))
  }
}

export const signIn = (email,password) => {
  return async (dispatch) => {
    
    if(email === "" || password === ""){
      alert("必須項目が未入力です")
      return false
    }
    auth.signInWithEmailAndPassword(email,password)
      .then(result => {
        const user = result.user
        if(user){
          const uid = user.uid

          db.collection("users").doc(uid).get()
          .then(snapshot => {
            const data = snapshot.data()

            dispatch(signInAction({
              isSignedIn: true,
              role: data.role,
              uid: uid,
              username: data.username,
              addres: data.addres,
              postNumber: data.postNumber
            }))
            dispatch(push("/home"))
          })
        }
      })
  }
}

export const sendInquire = (username,phone,title,content,mail,setModal) => {
  return async (dispatch) => {
  if (username === "" || phone === "" || title === "" || content === ""){
    alert("必須項目が未入力です")
    return false
  }
  const payload = {
    text: username + "さんから" + title + "に関してお問い合わせがありました。内容は以下の通りです"+"\n"+
          "メールアドレス:" + mail +"\n"+
          "内容:" + content 
  }
  const url = "https://hooks.slack.com/services/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"
  fetch(url,{
    method:"POST",
    body:JSON.stringify(payload)
  }).then(()=>{
    setModal()
    
  })
 }
}

export const signUp = (email,password,confirmPassword,username,postNumber,addres) => {
  return async (dispatch) => {
    if (email === "" || password === "" || confirmPassword === "" || username === "" || postNumber === "" || addres === ""){
      alert("必須項目が未入力です")
      return false
    }
  if (password !== confirmPassword){
    alert("パスワードが一致しません。もう一度お試しください")
    return false
  }
  return auth.createUserWithEmailAndPassword(email,password)
  .then(result => {
    const user = result.user

    if(user){
      const uid = user.uid
      const timestamp = FirebaseTimestamp.now()
      const userInitialData = {
        created_at: timestamp,
        email: email,
        role: "customer",
        uid: uid,
        updated_at: timestamp,
        username: username,
        postNumber: postNumber,
        addres: addres
      }
      db.collection("users").doc(uid).set(userInitialData)
      .then(()=> {
        dispatch(push("/home"))
      })
    }
  })
}


}
export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction());
        dispatch(push("/home"))
      })
  }
}
