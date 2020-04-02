import React from "react";

const Field = ({ name, value, onChange, placeholder, type = "text", error }) => (
    <div className="form-group">
        <input
            type={ type }
            name={ name }
            value={ value }
            onChange={ onChange }
            className={ "form-control" + (error ? " is-invalid" : "") }
            placeholder={ placeholder }
        />
        <p className="invalid-feedback">{error}</p>
    </div>
);

export default Field;