import React from 'react'
import TabToExpand from './tabToExpand'
import Tile from './Tile'

const DataTable = ({ heading, titleValue, dataValue }) => {
    return (
        <div className="container">
            <div id="heading">
                <h1>{heading}</h1>
            </div>
            {/* {dataValue.map(x => <Tile tileData={x} />)} */}
            <div>
                <TabToExpand />
                {dataValue.length != 0 ? dataValue.map(x => <Tile tileData={x} titleValue={titleValue} />) : ""}
            </div>
        </div>
    )
}

export default DataTable
