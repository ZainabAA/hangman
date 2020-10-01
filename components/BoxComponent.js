import React from 'react';
import '../App.css'; 

function BoxComponent(props){
    let wordArray = [];
    for(let i=0; i<props.word.length; i++){
        wordArray.push(<div className={'box '+props.word[i]}></div>);
    }
    return wordArray;
}

export default BoxComponent;
