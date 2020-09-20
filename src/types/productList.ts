export type ListItem = {
    id: string,
    name: string,
    measurementUnit: string,
    quantity: number,
    price: number,
}

export type ReducerAction = {
    readonly type: 'PRODUCT_LIST/ADD_ITEM' | 'PRODUCT_LIST/REMOVE_ITEM' | 'PRODUCT_LIST/RESET_LIST',
    readonly payload?: ListItem | string,
}

export type ReduxReducerState = {
    readonly list: ListItem[],
}