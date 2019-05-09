import { database } from '../../firebase';

//Initial State
const initialState = {
  allItems: [],
  selectedItem: {},
};

//Action Types
const GET_ALL_ITEMS = 'GET_ALL_ITEMS';
const SELECT_ITEM = 'SELECT_ITEM';

//Action creators
export const getAllItems = items => ({ type: GET_ALL_ITEMS, items });
export const selectItem = item => ({ type: SELECT_ITEM, item });

//Thunks
export const fetchAllItems = () => {
  return async dispatch => {
    try {
      //call to firebase here
      //dispatch(getAllItems())
    } catch (error) {
      console.log('ERROR FETCHING ALL ITEMS', error);
    }
  };
};

export const fetchOneItem = sunglasses => {
  return async dispatch => {
    try {
      //call to firebase here
      //dispatch(selectItem())
    } catch (error) {
      console.log('ERROR FETCHING ONE ITEM', error);
    }
  };
};

//handlers
const handlers = {
  [GET_ALL_ITEMS]: (state, action) => ({
    ...state,
    allItems: action.items,
  }),
  [SELECT_ITEM]: (state, action) => ({
    ...state,
    selectedItem: action.item,
  }),
};

//ITEMS REDUCER
export default (itemsReducers = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
});
