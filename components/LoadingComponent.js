import React from 'react';
import '../App.css'; 

function LoadingComponent(props){
    return(
        <div class='loading-container'>
            <p>Finding a word..</p>
            <div class='loading-circle'>
            </div>
        </div>
    )
}

export default LoadingComponent;