import './App.css'
import { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import Card from './components/Card'

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

  // Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] 
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: nanoid()}))

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
        resetTurn()
        }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // const reset turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }


  const cardGrid = cards.map(card => {
    return (
      <Card 
        key={card.id} 
        card={card}
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched }
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
    </div>
  )
}

export default App
