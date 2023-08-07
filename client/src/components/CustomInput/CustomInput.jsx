import React, { forwardRef } from 'react';

import './CustomInput.scss';
import CustomButton from '../CustomButton/CustomButton';

const CustomInput = forwardRef((props, ref) => {

    const styles = {
        marginBottom: props.mb + 'px'
    };

    return (
        props.type === 'file'
        ? ( <div className="upload-btn-wrapper">
                <CustomButton>
                {
                    props.icon ? <i className="fas fa-paperclip"></i>
                    : <span>{props.text}</span>
                }
                <input ref={ref} { ...props } type={props.type} />
                </CustomButton>
            </div>)
        : ( <div className="custom-input__form-field">
                {props.label && <label
                    htmlFor={props.id}
                    className="custom-input__label">{props.label}
                    </label> }
                <input
                    style={styles}
                    {...props}
                    ref={ref}
                    type={props.type}
                    id={props.id}
                    className="custom-input__input"
                />
            </div>)
    );
});

export default CustomInput;