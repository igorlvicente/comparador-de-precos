import * as Types from '../actionTypes'
import { ListItem, ReducerAction, ReduxReducerState } from '../../types/productList'

const initialState: ReduxReducerState = {
    list: [],
}

const reducer = (state = initialState, action: ReducerAction) => ({
    ...state,
    list: listReducer(state, action),
})

const listReducer = (state: ReduxReducerState, action: ReducerAction): ListItem[] => {
    if (action.type === Types.PRODUCT_LIST.ADD_ITEM) {
        if (action.payload === undefined || typeof action.payload === 'string') {
            console.error('Tentando adicionar o seguinte item à lista de itens: ', action.payload)
        } else {
            return [...state.list, action.payload]
        }
    }

    if (action.type === Types.PRODUCT_LIST.REMOVE_ITEM) {
        return state.list.filter(item => item.id === action.payload)
    }

    if (action.type === Types.PRODUCT_LIST.RESET_LIST) {
        return []
    }
    return state.list
}

export default reducer