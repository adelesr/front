import React, { useState,useEffect } from 'react'
import { socket } from '../../utils/socket.js'
import Spinner from 'react-bootstrap/Spinner';
import MemoryCard from '../../components/MemoryCard/MemoryCard.jsx';
import axios from 'axios';
const MemoryGamePage = ({user1,user2}) => {
    const [message, setMessage] = useState('');
    //במסך הצאט- אם לוחץ על המשחק המשתנה הופך לTRUE
    const [player1, setPlayer1] = useState({...user1,score:0,inTheGame:false});
    const [player2, setPlayer2] = useState({...user2,score:0,inTheGame:false});
    const [gameStatus, setGameStatus] = useState('loading');
    const [cardsArray, setCardsArray] = useState([]); //כל הכרטיסים בלוח
    const [selectedCards, setSelectedCards] = useState([]) //מערך כרטיסים נבחרים
    const [turn, setTurn] = useState(player1);
    var index=0;


      const countSelectedCards = (card) =>{
      if(selectedCards.length < 2){
      setSelectedCards([...selectedCards, card]);
      }
      else if(selectedCards.length === 2){
        if((selectedCards[0].imgSrc)==(selectedCards[1].imgSrc)){
          if(turn === player1){
            setPlayer1({...player1, score:player1.score+1});
            setTurn(player2);
          }
          else{
            setPlayer2({...player2, score:player2.score+1});
            setTurn(player1);
          }
          io.emit('correctGuess', selectedCards[0], selectedCards[1]); //לעשות מאזין לאיוונט שיוציא את שני הכרטיסים מהמערך 
        }
      }
      else{setSelectedCards([]);}
    }

    useEffect(async() => {
        if(player1.inTheGame && player2.inTheGame)
            {
                socket.on('gameStart', (msg,memoryCardsArray) => {
                  setCardsArray(memoryCardsArray);
                  setGameStatus('in-game');
                  setMessage(msg+`\n ${player1.userName} vs ${player2.userName}`);
                  
                });
            
            
    }
  }, []);
  return (
    <>
        {gameStatus === 'loading' && <h2 className='loadingMsg'>waiting for the other player to join in...
          <Spinner animation="grow" variant="info"/></h2>}
        {gameStatus === 'in-game' && 
        <div>
          <div>
            {cardsArray.forEach((card, index) => {
              if(index%5===0)
              {
                
                <div className='line'>
                <MemoryCard card={card} key={index} onClickCard={countSelectedCards}/>
                </div>
                cardsArray.splice(index, 4).map((card, index) => {
                  <div>
                     <MemoryCard card={card} key={index} onClickCard={countSelectedCards}/>
                  </div>
                })
              }
            }
              // else {
              //   lineIndex=index;
              //   <div>
              //      <br />
              //     <MemoryCard card={card} key={index} onClickCard={countSelectedCards}/>
              //   </div>
              // }
             )} 
          
          </div>
             <div>
              {message}
              <p>{player1.userName} is start</p>
            </div>
        </div>   
        }

    </>
  )

}
export default MemoryGamePage;