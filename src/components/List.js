import React from 'react';
import { connect } from 'react-redux';
import { getList, addTask, searchList, checkedTask, getPage } from '../actions/listActions';
import Lines from '../components/Lines'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            search: '',
            isSrch: false
        }
    }
    componentDidMount() {
        this.props.getList(0)
    }

    searchList(e) {
        e.preventDefault();
        this.setState({isSrch: true})
        this.props.searchList(this.state.search);
    }

    descChange(e) { this.setState({description: e.currentTarget.value}) }
    searchChange(e) { this.setState({search: e.currentTarget.value}) }

    addTask(e) {
        e.preventDefault();
        this.props.addTask(this.state.description);
        this.setState({description: ''});
    }
    renderList() {
        const list = this.props.list.lists;
        const user = this.props.user;
        let listTemplate = []
        if(list !== undefined) {
            if(list.id){
                if(Array.isArray(list.id)) {
                    for(let i = 0; i < list.id.length; i++) {
                        listTemplate[i] = {
                            id: list.id[i],
                            color: list.color[i],
                            description: list.description[i],
                            date: list.date[i],
                            chek: list.chek[i],
                        }
                    }
                } else {
                    listTemplate[0] = {
                        id: list.id,
                        color: list.color,
                        description: list.description,
                        date: list.date,
                        chek: list.chek,
                    }
                }
                listTemplate = listTemplate.map(el => {
                    return <Lines key={el.id}
                                color={'#'+el.color}
                                text={el.description}
                                date={el.date}
                                chek={el.chek}
                                id={el.id}
                                user={user.name === 'tanya' ? 1 : 0}
                                checkedTask={this.props.checkedTask}
                            />
                })
            } else {
                listTemplate = <p>Ничего не найдено.</p>
            }
        }
        return listTemplate
    }
    renderPagination() {
        let countP = this.props.list.count / 15;
        let pages = [];
        for(let i = 0; i < countP; i++) {
            if(this.props.list.page === i)
            pages[i] = <li 
                className='list-pagination__item list-pagination__active' 
                key={i} 
                onClick={() => this.props.getPage(i, this.state.isSrch, this.state.search)}
            >{i+1}</li>
            else
            pages[i] = <li 
                className='list-pagination__item' 
                key={i} 
                onClick={() => this.props.getPage(i, this.state.isSrch, this.state.search)}
            >{i+1}</li>
        }
        return <ul className='list-pagination'>{pages.map(el => el)}</ul>
    }
    render() {
        return (
            <div className='list'>
                <div className='list-search'>
                    <form>
                        <input type='search' onChange={this.searchChange.bind(this)} value={this.state.search} placeholder='Введите текст'/>
                        <button onClick={this.searchList.bind(this)}>Поиск</button>
                    </form>
                </div>
                { this.props.user.name === 'dimas' &&
                    <div className='list-add'>
                        <p>Добавить задание</p>
                        <textarea onChange={this.descChange.bind(this)} value={this.state.description} placeholder='Текст' />
                        <button onClick={this.addTask.bind(this)}>Добавить</button>
                        <p className='list-add_succes'>{this.props.user.addTaskSucces}</p>
                    </div>
                }
                <div className='list-wrap'>
                    {this.renderList()}
                </div>
                {this.renderPagination()}
            </div>
        )
    }
}

export default connect( state => ({
    list: state.list,
    user: state.user
  }), { getList, addTask, searchList, checkedTask, getPage } )
(List);