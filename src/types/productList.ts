export type ListItem = {
    id: string,
    name: string,
    measurementUnit: string,
    quantity: number,
    price: number,
}

export type ReducerAction = {
    type: 'PRODUCT_LIST/ADD_ITEM' | 'PRODUCT_LIST/REMOVE_ITEM' | 'PRODUCT_LIST/RESET_LIST',
    payload: ListItem,
}

export type ReducerState = {
    list: ListItem[],
}