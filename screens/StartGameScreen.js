import React from 'react';
import '../App.css'; 

function StartGameScreen(props){
    return (
            <div className='input-container'>
                <input type='text' maxLength='1' value={props.input} onChange={props.inputChange}/>
                <button className='btn' type='submit' onClick={props.submitInput}>Make Guess</button>
            </div>
    );
}

export default StartGameScreen;
