import React from 'react';
import '../App.css'; 
import BoxComponent from './BoxComponent';

function WordDefComponent(props){
    return(
        <div>
            <p className='definition'><em>"{props.definition}"</em></p>
            {props.partOfSpeech?<p><em>{props.partOfSpeech}</em></p>:null}
            <div className='word-boxes'  >
                <BoxComponent word={props.word} />
            </div>
        </div>
    );
}

export default WordDefComponent;