import './App.css'
import { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import Card from './components/Card'
import Confetti from 'react-confetti'

const cardImages = [ 
    {"src": "/assets/helmet-1.png", matched: false},
    {"src": "/assets/potion-1.png", matched: false},
    {"src": "/assets/ring-1.png", matched: false},
    {"src": "/assets/scroll-1.png", matched: false},
    {"src": "/assets/shield-1.png", matched: false},
    {"src": "/assets/sword-1.png", matched: false} 
  ]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] 
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: nanoid()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0) // every time we shuffle the cards, we're starting a new game, so reset turns to 0
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare with useEffect
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })

        resetTurn()
      } 
      
      else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // const reset turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // Start a new game automatically (don't have to press new game when they first load the page)
  useEffect(() => {
    shuffleCards()
  }, [])

  const cardGrid = cards.map(card => {
    return (
      <Card 
        key={card.id} 
        card={card}
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
      />
    )  
  })

  return (
    <div className="App">
      <h1> Magic Memory </h1>
      <button onClick={shuffleCards}> New game </button>
      <div className="card-grid"> 
        {cardGrid}
      </div>
      <p>turns: {turns}</p>
    </div>
  )
}

export default App
