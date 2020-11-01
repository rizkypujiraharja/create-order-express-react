export const setCart = cart => {
  return {
    type: "SET_CART",
    payload: cart
  }
}

export const addToCart = item => {
  return {
    type: "ADD_TO_CART",
    payload: item
  }
}