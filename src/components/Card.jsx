import React from 'react'
import './card.css'

const Card = (props) => {

    
  const handleClick = () => {
    props.handleChoice(props.card)
  }

  return (
    <div className="card">
        <div className={flipped && "flipped"}>
            <img className="front" src={props.card.src} alt="card-front"/>
            <img 
                className="back" 
                onClick={handleClick}
                src="../assets/cover.png" 
                alt="card-back"/>
        </div>
    </div>
  )
}

export default Card
