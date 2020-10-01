import React from 'react';
import '../App.css'; 

function GameOverScreen(props){
    return(
        <div>
            <h2>GAME OVER</h2>
            <p>the word was <em>{props.word}</em></p>
            <button className='btn' type='submit' onClick={() => props.reset(false)}>Play Again</button>
        </div>
    );
}

export default GameOverScreen;