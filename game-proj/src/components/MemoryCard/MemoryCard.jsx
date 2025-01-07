import React, { useState } from 'react'

const MemoryCard = ({memoryCard,onClickCard}) => {
  const {imgSrc} = memoryCard;
  const [isSelected, setIsSelected] = useState(memoryCard.isSelected);
  
  const memoryCardSelect =()=>{
    setIsSelected(!isSelected);
    if(isSelected){
      onClickCard(memoryCard);
    }
    console.log(isSelected);
    
  }
  return (
    <div id='card' className='card' onClick={memoryCardSelect} style={{borderColor:isSelected?'green': 'black'}}>
      {isSelected? (<div><img src={imgSrc} alt="memory card" className='img' /></div>) :('') }
    </div>
  )
}

export default MemoryCard