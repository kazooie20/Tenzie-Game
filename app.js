import React from "react"
// import {nanoid} from "nanoid"
import Confetti from "react-confetti";

function Die(props) {
     const heldStyle = {
        'backgroundColor' : '#59E391'
    }
    return (
        <div onClick={()=>props.holdDice(props.id)}className="grid-item" style={props.isheld ? heldStyle : null}>{props.value}</div>
    )
}

export default function App() {
    
    const [tenzieArr, setTenzieArr] = React.useState([]);
    //Tenzies will represent if the user has won the game or not
    const [tenzies, setTenzies] = React.useState(false);
    
    const generateStartingArr = () => {
        const diceArr = [];
        for (let i = 0; i < 10; i++) {
            const randNum = Math.floor(Math.random() * 6);
            diceArr.push({
                id : i,
                value : randNum,
                isheld : false
            });
        }
        setTenzieArr(diceArr);
    }
    
    React.useEffect(()=>{
        generateStartingArr();
    },[])
    
    React.useEffect(()=>{
        if (tenzieArr.length > 0) {
            const allHeld = tenzieArr.every(die => die.isheld);
            const firstVal = tenzieArr[0].value;
            const allSameVal = tenzieArr.every(die => die.value === firstVal);
            if (allHeld && allSameVal){
                setTenzies(true)
            }
            
        }
        
        
    },[tenzieArr])
    
    const holdDice = (id) => {
        setTenzieArr((prevArr) => {
            return prevArr.map((dice) => {
                if (id === dice.id) {
                    return {...dice, isheld : !dice.isheld};
                }
                return dice;
            })
            
        })
    }
    
    const rollDice = () => {
        if (tenzies) {
            generateStartingArr();
            setTenzies(false);
        }
        else {
            setTenzieArr((prevArr) => {
            return prevArr.map((dice) => {
                if (dice.isheld === false) {
                    return {...dice, value : Math.floor(Math.random()*6)}
                }
                return dice;
            })
        })  
        }
        
    }
    
    return (
        
        <main>
            {tenzies ? <Confetti /> : null}
            <h1 className='main-title'>{!tenzies ? 'Tenzies' : 'Game Over!' }</h1>
            <p className='main-para'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
            <div className="grid-container">
                
                {tenzieArr.map((num)=>{
                    return <Die key={num.id} value={num.value} isheld={num.isheld} holdDice={() => holdDice(num.id)} />
                    
                })}
                 
            </div>
            <button className='roll-btn' onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
            
        </main>
    )
}
