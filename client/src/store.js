import { combineReducers,applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer} from './reducers/productReducers'
import {cartReducers} from './reducers/cartReducers'
const reducer = combineReducers({
    productList: productListReducer,
    productDetailsReducer: productDetailsReducer,
    cart: cartReducers,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')) :[]
const initialState = {
    cart:{ cartItems: cartItemsFromStorage},
}
const middleware = [thunk]

const store = createStore(reducer,initialState ,composeWithDevTools
    (applyMiddleware(...middleware)) )


    export default store;
