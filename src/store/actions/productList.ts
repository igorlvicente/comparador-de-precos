import { ListItem } from '../../types/productList'
import { PRODUCT_LIST } from '../actionTypes'

export const addListItem = (item: ListItem) => ({
    type: PRODUCT_LIST.ADD_ITEM,
    payload: item,
})

export const removeListItem = (item: ListItem) => ({
    type: PRODUCT_LIST.REMOVE_ITEM,
    payload: item,
})

export const resetList = () => ({
    type: PRODUCT_LIST.RESET_LIST,
})