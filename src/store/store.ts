import { createStore } from 'redux'
import rootReducer from './reducer'
import { devToolsEnhancer } from 'redux-devtools-extension'

const savedState = JSON.parse(localStorage.getItem('reduxState') || '{}')

const store = createStore(
    rootReducer,
    savedState,
    devToolsEnhancer({}),
)

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store
