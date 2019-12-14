const initialState = {
    lists: undefined
  };
  
  const list = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LIST':
        return { ...state, lists: action.data };
      default:
        return state;
    }
  };
  
  export default list;
  