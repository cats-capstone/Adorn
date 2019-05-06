//Initial State
const initalState = {
  allItems: [],
  selectedItem: {},
};

//Action Types
const SELECT_ITEM = 'SELECT_ITEM';

//Action creators
const selectItem = item => ({ type: SELECT_ITEM, item });

//handlers
const handlers = {
  [SELECT_ITEM]: (state, action) => ({
    ...state,
    selectedItem: action.item,
  }),
};

//ITEMS REDUCER
export const itemsReducers = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};
