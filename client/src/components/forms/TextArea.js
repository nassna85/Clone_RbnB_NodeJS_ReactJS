import React from 'react';

const TextArea = ({ name, placeholder, value, onChange, error, marginTop = "" }) => {
    return (
        <div className="form-group" style={{ marginTop:marginTop }}>
            <textarea
                className={ "form-control" + (error ? " is-invalid" : "")}
                name={ name }
                placeholder={ placeholder }
                value={ value }
                onChange={ onChange }
            >
            </textarea>
            <p className="invalid-feedback">{ error }</p>
        </div>
    );
};

export default TextArea;