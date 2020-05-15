import React from 'react'

const Gameover = ({gameover}) => {
    return (
        <div className={gameover ? 'gameover show' : 'gameover'}>
            <p>No more moves!</p>
        </div>
    )
}

export default Gameover;