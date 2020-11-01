// Reducer
const initialState = {
  orders: []
}
const orderReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SET_ORDERS':
      return {
        ...state,
        orders: payload
      }
    default:
      return state
  }
}

export default orderReducer