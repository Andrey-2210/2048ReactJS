import React from 'react';


const Cell = ({...props}) => 
    <div className={'board__cell ' + (props.value <= 0 && 'board__cell--empty')}>
        {props.value > 0 && props.value}
    </div>


export default Cell;