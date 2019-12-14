const initialState = {
  toggle: false,
  labelText: 'Введите слово для входа',
  name: '',
  addTaskSucces: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_AUTH':
      return { ...state, toggle: !state.toggle };
    case 'SHOW_ERROR':
      return { ...state, labelText: action.err };
    case 'SET_USER':
      return { ...state, name: action.name };
    case 'TASK_SUCCES':
      return { ...state, addTaskSucces: action.text };
    default:
      return state;
  }
};

export default user;
