export const SIGN_IN = "SIGN_IN"
export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART"
export const fetchProductsInCartAction = (products) => {
  return {
    type: "FETCH_PRODUCTS_IN_CART",
    payload:products
  }
};

export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
      postNumber: userState.postNumber,
      addres: userState.addres
    }
  }
};

export const SIGN_OUT = "SIGN_OUT"
export const signOutAction = (userState) => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      uid: "",
      username: "",
      role: "",
      postNumber: "",
      addres: ""
    }
  }
};