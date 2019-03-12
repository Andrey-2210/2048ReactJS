import React, {Fragment} from 'react';
import Cell from './Cell'


const Row = ({...props}) => 
    <Fragment>
        {props.value.map((cell, index) => <Cell key={index} value={cell} />)}
    </Fragment>


export default Row;