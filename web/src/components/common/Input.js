import React from 'react';

function Input(props) {
    return(
        <>
            <label htmlFor={props.for}>{props.label}</label>
                <input 
                name={props.for}
                id={props.for}
                required 
                value={props.value}
                type={props.type || 'text'}
                onChange={e => props.setAnState(e.target.value)}
            />
        </>
    );
}

export default Input;