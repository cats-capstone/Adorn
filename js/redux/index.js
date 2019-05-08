// library imports
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import {itemsReducer} from './arObjects'

const reducer = combineReducers({
  itemsReducer : itemsReducer

})

const store = createStore(reducer, thunkMiddleware)

export default store