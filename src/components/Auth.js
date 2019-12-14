import React, { useState } from 'react';

const Header = props => {
    const [name, setName] = useState('');
    const nameChange = e => setName(e.currentTarget.value);
    const auth = e => {
        e.preventDefault();
        props.postUser(name)
    }
    return (
        <div className='auth'>
            <form>
                <span onClick={() => props.showAuth()}>x</span>
                <label className='auth-login'><input type='text' onChange={nameChange}/>{props.labelText}</label>
                <button className='auth-btn' onClick={auth}>Вход</button>
            </form>
        </div>
    )
}

export default Header;