// Reducer
const initialState = {
  products: []
}
const productReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: payload
      }
    default:
      return state
  }
}

export default productReducer