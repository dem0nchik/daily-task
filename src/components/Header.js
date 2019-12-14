import React from 'react';
import { connect } from 'react-redux';
import { showAuth, postUser, chekME } from '../actions/actionsCreator';
import Auth from './Auth'

class Header extends React.Component {
    componentDidMount() { this.props.chekME() }
    render() {
        return (
            <div className='header'>
                { this.props.user.name ? 
                    <p>{this.props.user.name}</p> :
                    <p onClick={() => this.props.showAuth()}>Войти</p> }
                { this.props.user.toggle && 
                    <Auth 
                        showAuth={this.props.showAuth}
                        postUser={this.props.postUser}
                        labelText={this.props.user.labelText} /> }
            </div>
        )
    }
}

export default connect( state => ({
      user: state.user,
    }), { showAuth, postUser, chekME } )
(Header);