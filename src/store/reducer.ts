import { combineReducers } from 'redux'
import productList from './reducers/productList'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const rootReducer = combineReducers({ productList })
export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector