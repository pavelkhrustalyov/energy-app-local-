import React from "react";

import './CustomTextArea.scss';

const CustomTextArea = (props) => {
    return (
        <textarea required className="text__field" {...props}>
            { props.children }
        </textarea>
    ) 
}


export default CustomTextArea;