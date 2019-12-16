import utils from '../utils'

export const setUser = name => ({
  type: 'SET_USER',
  name,
});

export const showError = err => ({
  type: 'SHOW_ERROR',
  err,
});

export const chekME = () => {
  return dispatch => {
    fetch(utils.url+'/api/', {withCredentials: true})
      .then(res => res.json())
      .then(res => dispatch(setUser(res.text)))
  }
}
export const postUser = (name) => {
  return dispatch => {
    const body = 'name=' + encodeURIComponent(name);
        fetch(utils.url+'/api/auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body
            })
        .then(res => res.json())
        .then(res => {
            if(res.error) dispatch(showError(res.error))
            else {
                dispatch(setUser(name))
                dispatch(showAuth())
            }
        })
  };
};

export const showAuth = () => ({
  type: 'SHOW_AUTH',
});
