import React from 'react';

import './CustomButton.scss';
import classNames from 'classnames';

const CustomButton = ({ children, disabled, file, danger, success, ...otherProps }) => {
    return (
        <button 
            disabled={disabled} {...otherProps} 
            className={classNames("btn", {
            "danger": danger,
            "disabled": disabled,
            "success": success,
            "file": file === true
        })}>{children}</button>
    );
}

export default CustomButton;