import { database } from '../../firebase';

//Initial State
const initialState = {
  allItems: ['hello world'],
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
      let arr = []
      await database.ref('/furniture')
     .once('value')
     .then(function(snapshot) {
       
       //empty arr to populate
       snapshot.forEach(function(childSnapshot) {
         const product = childSnapshot.val()
         product.id = childSnapshot.key
         arr.push(product)
         
       })
       dispatch(getAllItems(arr))
       
       //dispatch
   })
    } catch (error) {
      console.log('ERROR FETCHING ALL ITEMS', error);
    }
  };
};

export const fetchOneItem = productId => {
  console.log('PRODUCTID UNDER FETCHONEITEM: ', productId)
  return async dispatch => {
    try {
      //call to firebase here
      //dispatch(selectItem())

      await database.ref('/furniture')
      .once('value').then(function(snapshot) {
        // console.log('FIND SINGLE PRODUCT SNAPSHOT HERE, HARD CODED', snapshot.child("-LeNGqL7PffvyaEL_CQI").val())
        // console.log('PRODUCTID: ', productId)
        // console.log('PASSED VARIABLE: ', snapshot.child(productId).val())
        const productInfo = snapshot.child(productId).val()
        dispatch(selectItem(productInfo))
      })
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
