import React from 'react'
import { useState } from 'react'
import { Accordion, Card, useAccordionToggle } from 'react-bootstrap'
import { FiChevronsDown, FiChevronsUp } from 'react-icons/fi';


const CustomToggle = ({ children, eventKey }) => {
    const [EventKey, setEventKey] = useState((parseInt(eventKey)));
    console.log(" This is test ");
    const decoratedOnClick = useAccordionToggle(eventKey, (e) => { setEventKey(EventKey + 1) }
    );

    return (
        <div className="row">
            <div className="AccordianContent col-10">
                {children}
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
    const cssStyle = {
        backgroundColor: "#df8585"
    }
    return (
        <>
            <Accordion defaultActiveKey={defaultActiveKey}>
                <Card >
                    <Card.Header style={{ backgroundColor: cssStyle.backgroundColor }} >
                        <CustomToggle eventKey={openOrClose}>{ToggleContent}</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={openOrClose}>
                        <Card.Body>{Body}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}

export default TabToExpand;
