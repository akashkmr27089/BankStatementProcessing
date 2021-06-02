import React from 'react'
import TabToExpand from './tabToExpand'
import Tile from './Tile'

const TabToExpandTile = (tileData, titleValue) => {
    console.log("TileDisplay", { titleValue })
    return (<h1>Test 1 </h1>)
}

const DataTable = ({ heading, titleValue, dataValue }) => {
    return (
        <div className="container">
            <div id="heading">
                <h3>{heading}</h3>
            </div>
            <div>
                {dataValue.length != 0 ? dataValue.map(x => <TabToExpand defaultActiveKey="0" openOrClose="1" ToggleContent={x[4]} Body="Data" tileData={x} titleValue={titleValue} />) : ""}
                {/* <TabToExpand defaultActiveKey="0" openOrClose="0" ToggleContent="Click Me" Body="Data" style={{}} /> */}
                {/* {dataValue.length != 0 ? dataValue.map(x => <Tile tileData={x} titleValue={titleValue} />) : ""} */}
            </div>
        </div>
    )
}

export default DataTable
