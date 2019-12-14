import React from 'react';

const Lines = props => {
    return (
        <div className='list-item' style={{background: props.color}}>
            <div className='list-item_date'>{props.date}</div>
            <div className='list-item_desc'>{props.text}</div>
            { props.chek === '1' ?
                    <div className='list-item_chek'>✓</div> :
                     props.user ?
                     <input type='checkbox' onClick={() => props.checkedTask(props.id)} className='list-item_verific'/> :
                     <div className='list-item_chek list-item_nochek'>•</div>
            }
        </div>
    )
}

export default Lines;