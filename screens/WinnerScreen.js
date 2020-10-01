import React from 'react';
import '../App.css'; 

function WinnerScreen(props){
    return (
        <div>
            <h2>Congradulations</h2>
            <h3>You Won!</h3>
            <button className='btn' type='submit' onClick={() => props.reset(true)}>Play Again</button>
        </div>
    )
}

export default WinnerScreen;