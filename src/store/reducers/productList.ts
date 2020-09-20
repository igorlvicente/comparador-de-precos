import * as Types from '../actionTypes'
import { ReducerAction, ReducerState } from '../../types/productList'

const initialState: ReducerState = {
    list: [],
}

export default function (state = initialState, action: ReducerAction) {
    return {
        ...state,
        list: listReducer(state, action),
    }
}

const listReducer = (state: ReducerState, action: ReducerAction) => {
    switch (action.type) {
        case Types.PRODUCT_LIST.ADD_ITEM:
            return [...state.list, action.payload]
        case Types.PRODUCT_LIST.REMOVE_ITEM:
            return state.list.filter(item => item.id === action.payload.id)
        case Types.PRODUCT_LIST.RESET_LIST:
            return []
        default:
            return state.list
    }
}