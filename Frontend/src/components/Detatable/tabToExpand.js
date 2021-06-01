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

const TabToExpand = ({ defaultActiveKey, ToggleCustom, Body, openOrClose }) => {
    // const [isExpanded, setIs]
    return (
        <>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <CustomToggle eventKey="0">Click me!</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <CustomToggle eventKey="1">Click me!</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )
}

export default TabToExpand;
