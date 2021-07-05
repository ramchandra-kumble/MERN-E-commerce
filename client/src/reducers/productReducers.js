  import { PRODUCT_LIST_REQUEST,
     PRODUCT_LIST_SUCCESS,
<<<<<<< HEAD
     PRODUCT_LIST_FAIL,
     PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS,
     PRODUCT_DETAILS_FAIL,
     } 
     from "../constants/productConstants"
export const productListReducer  =(state = {products: [] },action) =>{
switch (action.type)
=======
     PRODUCT_LIST_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, } from "../constants/productConstants"
export const productListReducer  = (state = { products: [] }, action) =>{
switch(action.type)
>>>>>>> dbee50a127c7b256c96a2c4f0ad0d7e6c8d8a3cb
{
    case PRODUCT_LIST_REQUEST:
        return {loading:true, products:[]}
    case PRODUCT_LIST_SUCCESS:
<<<<<<< HEAD
        return {loading:false,products:action.payload}
=======
        return {loading:false, products: action.payload}
>>>>>>> dbee50a127c7b256c96a2c4f0ad0d7e6c8d8a3cb
    case PRODUCT_LIST_FAIL:
        return {loading:false, error: action.payload}
            default:
                return state
        }        

}


export const productDetailsReducer  =(state = {product:{ reviews:[]}},action) =>{
    switch(action.type)
    {
        case PRODUCT_DETAILS_REQUEST:
            return {...state,loading:true}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false,product:action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading:false,error:action.payload}
                default:
                    return state
            }        
    
    }