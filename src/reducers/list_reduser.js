const initialState = {
    lists: undefined,
    page: 0,
    count: 0
  };
  
  const list = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LIST':
        return { ...state, lists: action.data };
      case 'SET_COUNT':
        return { ...state, count: action.data };
      case 'SET_PAGE':
        return { ...state, page: action.data };
      default:
        return state;
    }
  };
  
  export default list;
  