import { database, auth } from '../../firebase';

//Initial State
const initialState = {
  allItems: ['hello world'],
  selectedItem: {},
  models: [],
  hasRendered: false,
  favorites: []
};

//Action Types
const GET_ALL_ITEMS = 'GET_ALL_ITEMS';
const SELECT_ITEM = 'SELECT_ITEM';
const SET_MODEL = 'SET_MODEL';
const SET_RENDER = 'SET_RENDER';
const GET_FAVORITES = 'GET_FAVORITES'
const ADD_FAVORITE = 'ADD_FAVORITE'
const DELETE_FAVORITE = 'DELETE_FAVORITE'

//Action creators
export const getAllItems = items => ({ type: GET_ALL_ITEMS, items });
export const selectItem = item => ({ type: SELECT_ITEM, item });
export const setModel = item => ({ type: SET_MODEL, item });
export const setRender = item => ({type: SET_RENDER, item})
export const allFavorites = favorites => ({type: GET_FAVORITES, favorites})
export const favorite = item => ({type: ADD_FAVORITE, item})
export const unfavorite = item => ({type: DELETE_FAVORITE, item})

//Thunks
export const fetchAllItems = () => {
  return async dispatch => {
    try {
      let arr = [];
      await database
        .ref('/furniture')
        .once('value')
        .then(function(snapshot) {
          //empty arr to populate
          snapshot.forEach(function(childSnapshot) {
            const product = childSnapshot.val();
            product.id = childSnapshot.key;
            arr.push(product);
          });
          dispatch(getAllItems(arr));

          //dispatch
        });
    } catch (error) {
      console.log('ERROR FETCHING ALL ITEMS', error);
    }
  };
};

export const fetchOneItem = productId => {
  return async dispatch => {
    try {
      await database
        .ref('/furniture')
        .once('value')
        .then(function(snapshot) {
          const productInfo = snapshot.child(productId).val();
          dispatch(selectItem(productInfo));
        });
    } catch (error) {
      console.log('ERROR FETCHING ONE ITEM', error);
    }
  };
};

export const fetchFavorites = () => {
  return dispatch => {
    try {
      const user = auth.currentUser
      if (user) {
        console.log('THERE IS A USER LOGGED IN!')
        const userRef = database.ref(`/users/${user.uid}`)
        userRef.once('value')
        .then(function(snapshot) {
          let favs = []
          if (snapshot.hasChild('favorites')) {
            snapshot.child('favorites').forEach(item => {
              favs.push(item.key)
            })
            console.log('FAVORITES HERE: ', favs)
            dispatch(allFavorites(favs))
          }
        })
      } else {
        dispatch(allFavorites([]))
      }
    } catch (error) {
      console.log('ERROR FETCHING FAVORITES! ', error)
    }
  }
}

export const addFavorite = productId => {
  return dispatch => {
    try {
      const user = auth.currentUser
      if (user) {
        const userRef = database.ref(`/users/${user.uid}`).child('favorites')
        userRef.update({[productId]: true})
        dispatch(favorite(productId))
      }
    } catch (error) {
      console.log('ERROR FAVORITING ITEM: ', error)
    }
  }
}

export const deleteFavorite = productId => {
  return dispatch => {
    try {
      const user = auth.currentUser
      if (user) {
        const userRef = database.ref(`/users/${user.uid}`).child('favorites')
        userRef.child(productId).removeValue()
        dispatch(unfavorite(productId))
      }
    } catch (error) {
      console.log('ERROR UNFAVORITING ITEM: ', error)
    }
  }
}

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
  [SET_MODEL]: (state, action) => ({
    ...state,
    models: [...state.models, action.item]
  }),
  [SET_RENDER]: (state, action) => ({
    ...state, 
    hasRendered: action
  }),
  [ADD_FAVORITE]: (state, action) => ({
    ...state,
    favorites: [...state.favorites, action.item]
  }),
  [GET_FAVORITES]: (state, action) => ({
    ...state,
    favorites: action.favorites
  })
};

//ITEMS REDUCER
export default (itemsReducers = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
});
