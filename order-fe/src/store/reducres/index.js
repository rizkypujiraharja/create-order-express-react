import { combineReducers } from "redux"
import cartReducer from "./cart"
import orderReducer from "./order"
import productReducer from "./product"

const rootReducer = combineReducers({
  order: orderReducer,
  product: productReducer,
  cart: cartReducer
})

export default rootReducer