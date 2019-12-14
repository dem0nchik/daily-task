import React from 'react';
import { connect } from 'react-redux';
import { getList, addTask, searchList, checkedTask } from '../actions/actionsCreator';
import Lines from '../components/Lines'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            search: ''
        }
    }
    componentDidMount() {
        this.props.getList()
    }

    searchList(e) {
        e.preventDefault();
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
            </div>
        )
    }
}

export default connect( state => ({
    list: state.list,
    user: state.user
  }), { getList, addTask, searchList, checkedTask } )
(List);