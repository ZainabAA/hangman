import React from 'react';
import './App.css'; 
import ReactDOM from "react-dom";

import LoadingComponent from './components/LoadingComponent';
import WordDefComponent from './components/WordDefComponent';
import StartGameScreen from './screens/StartGameScreen';
import GameOverScreen from './screens/GameOverScreen';
import WinnerScreen from './screens/WinnerScreen';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            word: '',
            definition: '',
            partOfSpeech: '',
            input: '',
            score: 0,
            guessCount: 10,
            correctLetters: 0,
        }
        this.generateWord = this.generateWord.bind(this);
        this.generateDescription = this.generateDescription.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.submitInput = this.submitInput.bind(this);
        this.gameLogic = this.gameLogic.bind(this);
        this.reset = this.reset.bind(this);
    }
    
    generateWord = async () => {
        return fetch('https://random-word-api.herokuapp.com/word?number=1')
            .then((response)=>response.json())
            .then(data => {
                return data[0];
            });
    }

    generateDescription = async () => {
        let def = '';
        let wordValue = '';
        while(!def){
            wordValue = await this.generateWord();
            def = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${wordValue}/definitions`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                    "x-rapidapi-key": "e76e051df0msh11c262b9325e63dp12694cjsnfc34de4ef8b3"
                }
            }).then(response => {
                if(response.ok)
                    return response.json();
                else
                    throw new Error('Something went wrong');
            })
                .then(data=>{
                    if(data){
                    
                    return data.definitions[0];
                    }
                    else{
                        return undefined;
                    }
                })
                .catch((error)=>{
                    return undefined;
                });
        }
        
        this.setState({
            definition: def.definition,
            partOfSpeech: def.partOfSpeech,
            word: wordValue
        });
    }
    componentDidMount(){
        this.generateDescription();
        document.addEventListener('keypress', (event)=>{
            if(event.key === 'Enter')
                this.submitInput();
        });

    }

    inputChange(event){
        this.setState({
            input: event.target.value
        });
    }

    submitInput(){
        if(this.state.input && this.state.word.indexOf(this.state.input) !== -1){
            let correctLetters = document.querySelectorAll('.'+this.state.input);
            correctLetters.forEach(node => {
                if(node.childElementCount==0){
                    let renderLetter = document.createElement('p');
                    renderLetter.textContent = this.state.input;
                    node.append(renderLetter);
                    this.setState(state => ({
                        correctLetters: state.correctLetters + 1
                    }));
                }
            });
        }
        else{
            this.setState( state => ({
                guessCount: state.guessCount - 1
            }));
        }
        this.setState({
            input: ''
        });
    }

    reset(win){
        if(win){
                
            this.setState( state => ({
                word: '',
                guessCount: 10,
                correctLetters: 0,
                score: state.score + 1
            }));
        }
        else{
            this.setState({
                word: '',
                guessCount: 10,
                correctLetters: 0
            });
        }
        this.generateDescription();
    }

    gameLogic(){
        if(this.state.word && this.state.guessCount > 0){
            if(this.state.correctLetters === this.state.word.length){
                // this.setState(state => ({
                //     score: state.score + 1
                // }));
                const node = ReactDOM.findDOMNode(this);
                if (node instanceof HTMLElement) {
                    const box = node.querySelectorAll('.box');
                    box.forEach(boxNode => {
                        boxNode.classList.add('animated-box');
                    })
                }
                return (<WinnerScreen reset = {this.reset}/>);
            }
            return <StartGameScreen
                    input={this.state.input} 
                    inputChange={this.inputChange} 
                    submitInput={this.submitInput}
                     />;
        }
        else if(this.state.guessCount === 0){
            return <GameOverScreen word={this.state.word} reset = {this.reset}/>;
        }
        
    }

    render(){
        console.log('render: ',this.state);
        return(
            <div className='main-container'>
                <header>
                    <h1>Hangman</h1>
                    <h3>Score: {this.state.score}</h3>
                    <p>Guesses Left: {this.state.guessCount}</p>
                </header>
                {this.state.word? <WordDefComponent 
                    word={this.state.word} 
                    definition={this.state.definition}
                    partOfSpeech={this.state.partOfSpeech} /> : <LoadingComponent />}
                
                {this.gameLogic()}
                
            </div>
        );
    }
}

export default App;
