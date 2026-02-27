export const initialStore = () => {

  const DataStorage = JSON.parse(localStorage.getItem('StarWarsData')) || {};
  return {
    characters: [],
    starships: [],
    planets: [],
    favoritesList: [],
    favorite: false,
    details: null,
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'GET_Characters':
      return {
        ...store, characters: action.payload,
      };

    case 'GET_Starships':
      return {
        ...store, starships: action.payload,
      };

    case 'GET_Planets':
      return {
        ...store, planets: action.payload,
      };

    case 'SET_Favorites':
      return {
        ...store, favoritesList: action.payload,
      };
       case 'GET_Details':
      return {
        ...store, details: action.payload,
      };



    default:
      return store;
  };
}
