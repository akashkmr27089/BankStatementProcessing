import React from 'react'
import TabToExpand from './tabToExpand'

const DataTable = ({ heading, titleValue, dataValue }) => {
    return (
        <div className="container">
            <div id="heading">
                <h3>{heading}</h3>
            </div>
            <div className="scrollmenu row">
                {dataValue.length != 0 ? dataValue.map(x => <TabToExpand defaultActiveKey="0" openOrClose="1" ToggleContent={x[4]} Body={x} tileData={x} titleValue={titleValue} key={`key_${x[0]}`} />) : ""}
            </div>
        </div>
    )
}

export default DataTable
