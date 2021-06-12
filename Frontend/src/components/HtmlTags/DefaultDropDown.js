import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from "react-redux";
import { setCategoryData } from '../../redux/transaction';

const DropDownDefault = ({ dropdownValues, index, selectedIndex }) => {
    const dispatch = useDispatch();
    // let flag = true;
    const dropdownElement = document.querySelector(`select[name=dropDown_${index}]`);
    let Options = dropdownValues.map(x => <option value={x}>{x}</option>);
    // if (flag && { dropdownValues }.dropdownValues.length > 0) {
    //     flag = false;
    //     dropdownElement.selectedIndex = selectedIndex;
    // }
    const changingFunction = () => {
        console.log("OnChangeFunction");
        var newSelectedIndex = dropdownElement.selectedIndex;
        dispatch(setCategoryData(JSON.stringify({ 'index': index, 'selectedIndex': newSelectedIndex })));
    };

    return (
        <div className="App container">
            <select name={`dropDown_${index}`} className="form-control" required onChange={changingFunction}>
                <option disabled selected value>Options</option>
                {Options}
            </select>
        </div >
    )
};


export default DropDownDefault
