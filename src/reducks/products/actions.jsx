export const FETCH_PRODUCTS = "FETCH_PRODUCTS"
export const DERETE_PRODUCTS = "DERETE_PRODUCTS"

export const fetchProductsAction = (products) => {
  return {
    type: "FETCH_PRODUCTS",
    payload: products
  }
}
export const deleteProductsAction = (products) => {
  return {
    type: "DERETE_PRODUCTS",
    payload: products
  }
}