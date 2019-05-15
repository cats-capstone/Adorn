import { database, auth } from '../../firebase';

//Initial State
const initialState = {
  allItems: [],
  selectedItem: {},
  models: [],
  hasRendered: false,
  favorites: [],
  savedRooms: [],
};

//Action Types
const GET_ALL_ITEMS = 'GET_ALL_ITEMS';
const SELECT_ITEM = 'SELECT_ITEM';
const SET_MODEL = 'SET_MODEL';
const SET_RENDER = 'SET_RENDER';
const GET_FAVORITES = 'GET_FAVORITES';
const DELETE_MODEL = 'DELETE_MODEL';
const GET_SAVED_ROOMS = 'GET_SAVED_ROOMS';

//Action creators
export const getAllItems = items => ({ type: GET_ALL_ITEMS, items });
export const selectItem = item => ({ type: SELECT_ITEM, item });
export const setModel = item => ({ type: SET_MODEL, item });
export const setRender = item => ({ type: SET_RENDER, item });
export const allFavorites = favorites => ({ type: GET_FAVORITES, favorites });
export const deleteModel = itemId => ({ type: DELETE_MODEL, itemId });
export const allSavedRooms = savedRooms => ({
  type: GET_SAVED_ROOMS,
  savedRooms,
});

//Thunks
export const fetchAllItems = () => {
  return async dispatch => {
    try {
      let arr = [];
      await database
        .ref('/furniture')
        .once('value')
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            const product = childSnapshot.val();
            product.id = childSnapshot.key;
            arr.push(product);
          });
          dispatch(getAllItems(arr));
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
          productInfo.id = productId;
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
      const user = auth.currentUser;
      if (user) {
        const userRef = database.ref(`/users/${user.uid}`);
        userRef.on('value', function(snapshot) {
          let favs = [];
          if (snapshot.hasChild('favorites')) {
            snapshot.child('favorites').forEach(item => {
              favs.push(item.key);
            });
            dispatch(allFavorites(favs));
          }
        });
      } else {
        dispatch(allFavorites([]));
      }
    } catch (error) {
      console.log('ERROR FETCHING FAVORITES! ', error);
    }
  };
};

export const addFavorite = productId => {
  return () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = database.ref(`/users/${user.uid}`).child('favorites');
        userRef.update({ [productId]: true });
      }
    } catch (error) {
      console.log('ERROR FAVORITING ITEM: ', error);
    }
  };
};

export const deleteFavorite = productId => {
  return () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = database.ref(`/users/${user.uid}`).child('favorites');
        userRef.child(productId).remove();
      }
    } catch (error) {
      console.log('ERROR UNFAVORITING ITEM: ', error);
    }
  };
};

export const addSavedRoom = roomId => {
  return () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = database.ref(`/users/${user.uid}`).child('rooms');
        userRef.update({ [roomId]: something });
      }
    } catch (error) {
      console.log('Error adding saved room', error);
    }
  };
};

export const deleteSavedRoom = roomId => {
  return () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = database.ref(`/users/${user.uid}`).child('rooms');
        userRef.child(roomId).remove();
      }
    } catch (error) {
      console.log('ERROR DELETING SAVED ROOM', error);
    }
  };
};

// export const fetchSavedRooms = () => {
//   return dispatch => {
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const userRef = database.ref(`/users/${user.uid}`);
//         userRef.on('value', function(snapshot) {
//           let savedRooms = [];
//           if (snapshot.hasChild('rooms')) {
//             snapshot.child('rooms').forEach(item => {
//               savedRooms.push(item.key);
//             });
//             dispatch(allSavedRooms(savedRooms));
//           }
//         });
//       } else {
//         dispatch(allSavedRooms([]));
//       }
//     } catch (error) {
//       console.log('ERROR FETCHING SAVED ROOMS! ', error);
//     }
//   };
// };

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
    models: [...state.models, action.item],
  }),
  [SET_RENDER]: (state, action) => ({
    ...state,
    hasRendered: action,
  }),
  [GET_FAVORITES]: (state, action) => ({
    ...state,
    favorites: action.favorites,
  }),
  // [GET_SAVED_ROOMS]: (state, action) => ({
  //   ...state,
  //   savedRooms: action.savedRooms
  // }),
  [DELETE_MODEL]: (state, action) => ({
    ...state,
    models: state.models.filter(item => {
      return item.id !== action.itemId;
    }),
  }),
};

//ITEMS REDUCER
export default (itemsReducers = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
});
