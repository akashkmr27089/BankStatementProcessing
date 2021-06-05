import React from 'react'

const Tile = ({ tileData, titleValue }) => {
    return (
        <div className="card" id={`Tiles_${tileData[0]}`} >
            <div class="card-header">
                {`${titleValue[1]} : ${tileData[1]}`}
            </div>
            <div className="card-body">
                <p>{`${titleValue[2]} : ${tileData[2]}`}</p>
                <p>{`${titleValue[3]} : ${tileData[3]}`}</p>
                <p>{`${titleValue[4]} : ${tileData[4]}`}</p>
                <p>{`${titleValue[5]} : ${tileData[5]}`}</p>
                <p>{`${titleValue[6]} : ${tileData[6]}`}</p>
            </div>

        </div>
    )
}

export default Tile
