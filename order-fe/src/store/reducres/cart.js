// Reducer
const initialState = {
  cart: []
}
const cartReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SET_CART':
      return {
        ...state,
        cart: payload
      }
    case 'ADD_TO_CART':
      let newCart = [...state.cart]
      newCart.push(payload)
      return {
        ...state,
        cart: newCart
      }
    default:
      return state
  }
}

export default cartReducer