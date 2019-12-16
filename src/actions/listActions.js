import utils from '../utils'

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

export const searchList = (text, page = 0) => {
  return dispatch => {
    if(text==='') dispatch(setPage(0))
    dispatch(getCountPag('search', text))
    fetch(utils.url+`/api/search.php?s=${text}&p=${page}`)
      .then(res => res.json())
      .then(res => dispatch(setList(res)))
  }
}


export const checkedTask = (id, page) => {
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
    .then(() => dispatch(getList(page)))
  };
};


export const getList = (page = 0) => {
  return dispatch => {
    dispatch(getCountPag())
    fetch(utils.url+'/api/list.php?p='+page)
      .then(res => res.json())
      .then(res => dispatch(setList(res)))
  }
  
}

export const setCount = data => ({
  type: 'SET_COUNT',
  data
})

export const getCountPag = (module = 'list', srch = '') => {
  return dispatch => {
    fetch(utils.url+`/api/${module}.php?c&s=${srch}`)
      .then(res => res.json())
      .then(res => dispatch(setCount(res.count)))
  }
}

export const setPage= data => ({
  type: 'SET_PAGE',
  data
})

export const getPage = (page, isSrch, text) => {
  return dispatch => {
    if(isSrch) {
      dispatch(searchList(text, page))
    } else {
      dispatch(getList(page))
    }
    dispatch(setPage(page))
  }
}
