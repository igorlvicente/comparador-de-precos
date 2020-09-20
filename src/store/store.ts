import { createStore } from 'redux'
import rootReducer from './reducer'
import { devToolsEnhancer } from 'redux-devtools-extension'

export default createStore(
    rootReducer,
    devToolsEnhancer({}),
)
