import React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { selectCards, selectCardsByQuizz } from "./slices/quizzSlice"
import './styles/cards.css'


export function Card({quizzId}) {
    const filterQuizzId = selectCardsByQuizz(quizzId)
    const cards = useSelector(filterQuizzId)
    const numOfCards = cards.front.length
    
    const [flipped, setFlipped] = useState(false)
    const [index, setIndex] = useState(0)
    const [counter, setCounter] = useState(1)
    const [text, setText] = useState(cards.front[0]) //

    const handleFlip = () => {
        setFlipped(true)
        setText(cards.back[index])
    }

    const handleBack = () => {
        if(counter > 1) {
            setCounter(counter-1)
            setFlipped(false)
            setText(cards.front[index-1])
            setIndex(index -1)
        } else {
            return
        }
    }

    const handleNext = () => {
        if(counter <= numOfCards-1) {
            setCounter(counter+1)
            setFlipped(false)
            setText(cards.front[index+1])
            setIndex(index +1)
        } else {
            return
        }
    }

    return (
        <div className="cardContainer">
            <nav className="cardNav">
                <button type='button' name='back' onClick={e => handleBack()}>{'<'}</button>
                <h3>{counter}</h3>
                <button type='button' name='next' onClick={e => handleNext()}>{'>'}</button>
            </nav>

            <div className={flipped ? 'card back' : 'card front'} aria-label='card to flip' onClick={handleFlip}>
                <span>{text}</span>
            </div>
        </div>
    )
}