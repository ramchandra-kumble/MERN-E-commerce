import { combineReducers,applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer} from './reducers/productReducers'
import {cartReducers} from './reducers/cartReducers'
const reducer = combineReducers({
    productList: productListReducer,
<<<<<<< HEAD
    productDetailsReducer: productDetailsReducer,
    cart: cartReducers,
=======
    productDetails: productDetailsReducer,
>>>>>>> 68065d521ab17185b9331a983a29658929e3d827
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
