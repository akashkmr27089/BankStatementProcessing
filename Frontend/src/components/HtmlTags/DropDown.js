import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

const DropDown = ({ setSelected, dropdownValues, title, id }) => {

    // Parameters:
    // const dropdownValues = ["OptionA", "OptionB", "OptionC", "OptionD"];
    // <DropDown setSelected={setValue} dropdownValues={dropdownValues} title={"Option"} />

    const handleSelect = (e) => {
        console.log("Selected Value", e);
        setSelected(e);
    }

    let optionsDropDown = dropdownValues.map((x, i) => <Dropdown.Item eventKey={x} key={x} id={i}>{x}</Dropdown.Item>);
    return (
        <div className="App container">
            <DropdownButton
                title={title}
                id={id}
                onSelect={handleSelect}
            >
                {optionsDropDown}
            </DropdownButton>
        </div >
    )
}

export default DropDown
