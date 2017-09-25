import React from 'react'
import classnames from 'classnames'

const TextFieldGroup = ({ label, type, field, value, onChange, onBlur, error }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            type={type}
            className={classnames('form-control', { 'is-invalid': error })}
            name={field}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
        <div className="invalid-feedback">{error}</div>
    </div>
)

export default TextFieldGroup