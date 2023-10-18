import React, { Fragment } from 'react';

function FormInput({ value, name, onChange, type, error }) {
    return (
        <Fragment>
            <label htmlFor={name}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <input
                value={value}
                onChange={onChange}
                id={name}
                name={name}
                type={type}
                className='form-control'
            />
            {error && <div className='alert alert-danger mt-2'>{error}</div>}
        </Fragment>
    );
}

export default FormInput;
