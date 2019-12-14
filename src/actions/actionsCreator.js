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

export const setList = data => ({
  type: 'SET_LIST',
  data
})

export const addTask = (description) => {
  return dispatch => {
    const body = 'description=' + encodeURIComponent(description);
        fetch(utils.url+'/api/addtask.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body
            })
        .then(res => res.json())
        .then(res => {
            if(res.succes) {
              dispatch(getList())
              dispatch(taskSucces("Добавленно"));
            }
        })
  };
};

export const taskSucces = text => ({
  type: 'TASK_SUCCES',
  text
})

export const searchList = (text) => {
  return dispatch => {
    fetch(utils.url+'/api/search.php?s='+text)
      .then(res => res.json())
      .then(res => dispatch(setList(res)))
  }
}


export const checkedTask = (id) => {
  return dispatch => {
    let body = 'id=' + encodeURIComponent(id);
    fetch(utils.url+'/api/chektask.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body
        })
        
    .then(res => res.json())
    .then(res => console.log(res))
    .then(() => dispatch(getList()))
  };
};


export const getList = () => {
  return dispatch => {
    fetch(utils.url+'/api/list.php')
      .then(res => res.json())
      .then(res => dispatch(setList(res)))
  }
}

