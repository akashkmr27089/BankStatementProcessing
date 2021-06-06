import React from 'react'
import { useState } from 'react'
import { Accordion, Card, useAccordionToggle } from 'react-bootstrap'
import { FiChevronsDown, FiChevronsUp } from 'react-icons/fi';
import DropDown from '../HtmlTags/DropDown.js';

const CustomToggle = ({ children, eventKey, setValue, DropDownAttributes }) => {
    const [EventKey, setEventKey] = useState((parseInt(eventKey)));
    // console.log(" This is test ", DropDownAttributes);
    const decoratedOnClick = useAccordionToggle(eventKey, (e) => { setEventKey(EventKey + 1) }
    );

    return (
        <div className="row">
            <div className="AccordianContent col-7">
                {children}
            </div>
            <div className="col-3">
                <DropDown
                    setSelected={setValue}
                    dropdownValues={DropDownAttributes.dropdownValues}
                    title={DropDownAttributes.HeadTile.value || "Category"}
                    id={DropDownAttributes.id}
                />
            </div>
            <div className="AccordianArrow col-2">
                {(!({ EventKey }.EventKey % 2)) && <FiChevronsDown style={{ cursor: 'pointer' }} onClick={decoratedOnClick} /> || ({ EventKey }.EventKey % 2) && <FiChevronsUp style={{ cursor: 'pointer' }} onClick={decoratedOnClick} />}
            </div>
        </div>
    );
}

const TabToExpand = ({ defaultActiveKey, openOrClose, ToggleContent, Body, style }) => {
    // Parametes:
    // defaultActiveKey: "0"
    // openOrClose : Contains Default Option Upon page Load wheather to open or close 
    // Body : Contains Body content 
    // ToggleContent: Contains the Head content 
    let flagCredit = (Body[5] != 0 ? true : false);
    const cssStyle = {
        backgroundColor: "#df8585",
        // borderColor: '#0d6efd',
        borderColor: flagCredit ? 'red' : 'green',
        borderWidth: 1,
    }

    const [value, setValue] = useState('');
    const DropDownAttributes = {
        // dropdownValues: ["OptionA", "OptionB", "OptionC", "OptionD"],
        dropdownValues: ["Kulfi", "Dark Chocolate", "Maggie", "Pani Puri"],
        HeadTile: { value },
        id: `CategoryHead_${Body[0]}`
    };

    // console.log({ Body }.Body[0])
    let bodyTemplate = (
        <>
            <p><span><strong>Transaction Date : </strong></span> <span>{Body[1]}</span></p>
            <p><span><strong>Transaction Details: </strong></span> <span>{ToggleContent}</span></p>
            {Body[5] !== 0 ? (<p><span><strong>Debit : </strong></span> <span>{Body[5]}</span></p>) : ""}
            {Body[6] !== 0 ? (<p><span><strong>Credit : </strong></span> <span>{Body[6]}</span></p>) : ""}
            <p><span><strong>Total Retained Balance : </strong></span> <span>{Body[7]}</span></p>
        </>
    );

    let ToggleContent2 = (
        <>
            <div className="row">
                <div className="col-6">
                    <p><span>{Body[1]}</span></p>
                </div>
                <div className="col-6">
                    {Body[5] != 0 ? (<p><span>Debit : </span> <span>{Body[5]}</span></p>) : ""}
                    {Body[6] != 0 ? (<p><span>Credit : </span> <span>{Body[6]}</span></p>) : ""}
                </div>
            </div>
        </>
    );


    return (
        <>
            <Accordion defaultActiveKey={defaultActiveKey} className="col-6">
                <Card style={{ borderColor: cssStyle.borderColor, borderWidth: cssStyle.borderWidth }}>
                    <Card.Header>
                        <CustomToggle eventKey={openOrClose} setValue={setValue} DropDownAttributes={DropDownAttributes}>{ToggleContent2}</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={openOrClose}>
                        <Card.Body>{bodyTemplate}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}

export default TabToExpand;
