import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import { addQuizz, selectQuizzes, selectTopics } from './slices/listSlice'
import { addCards } from "./slices/quizzSlice"
import AlertIcon from '../../assets/alert.svg'
import './styles/form.css'

export function QuizzForm() {
    const dispatch = useDispatch()
    const topics = useSelector(selectTopics)
    const quizzes = useSelector(selectQuizzes)
    const [quizz, setQuizz] = useState('')
    const [topic, setTopic] = useState('')
    const [author, setAuthor] = useState('')
    const [submitted, setSubmit] = useState(false)
    const [duplicate, setDuplicate] = useState(false)
    const [empty, setEmpty] = useState(false)

    const [submitFront, setSubmitFront] = useState('')
    const [submitBack, setSubmitBack] = useState('')
    const [numCards, setNumCards] = useState(0)
    const [front, setFront] = useState([])
    const [back, setBack] = useState([])

    useEffect(() => {
        let alreadyExist = false
        quizzes.forEach(element => {
            if(element.name.toLowerCase() === quizz.toLowerCase()) {
                alreadyExist = true
            }
        });
        setDuplicate(alreadyExist)
    }, [quizz])

    const setNewQuizz = (e) => {
        e.preventDefault()
        const quizzId = uuidv4()
        const cardId = uuidv4()

        if(!duplicate && quizz && topic && author && topic !== 'Select a topic') {
            dispatch(addQuizz({
                id: quizzId,
                topicId: topic,
                name: quizz,
                author: author
            }))

            dispatch(addCards({
                quizzId: quizzId,
                id: cardId,
                front: front,
                back: back
            }))
    
            setQuizz('')
            setTopic('')
            setAuthor('')
            setSubmit(true)
            setDuplicate(false)
        } else {
            setEmpty(true)
        }
    }

    const handlePlus = (e) => {

        if(submitFront && submitBack) {
            setNumCards(numCards+1)
            if(!front && !back) {
                setFront([submitFront])
                setBack([submitBack])
                setSubmitFront('')
                setSubmitBack('')
            } else {
                setFront([...front, submitFront])
                setBack([...back, submitBack])
                setSubmitFront('')
                setSubmitBack('')
            }
        }
    }


    return (
        <div>
            <section>
                <h1>New Quizz</h1>

                <form id='topicForm' onSubmit={e => setNewQuizz(e)}>
                    <label>Quizz name:</label>
                    { duplicate && <h4 style={{color: '#fc472e'}}>The quizz already exists.<img src={AlertIcon} alt='Alert icon' aria-label="Alert icon" className="alert"/></h4> }
                    <input type='text' placeholder="Enter quizz name" value={quizz} onChange={e => setQuizz(e.target.value)}></input>

                    <label>Select a topic:</label>
                    <select id='selectTopic' name='selectTopic' defaultValue='default' onChange={e => setTopic(e.target.value)}>
                        <option value='Select a topic' key='default'>Select a topic</option>
                        {
                            topics.map((element, index) => {
                                return <option key={index} value={element.id}>{element.name}</option>
                            })
                        }
                    </select>

                    <label>Author:</label>
                    <input type='text' placeholder="Enter author" value={author} onChange={e => setAuthor(e.target.value)}></input>

                    <h2>Cards</h2>
                    <section className="newCard">
                        <label>Question</label>
                        <input type='text' placeholder="Enter question" value={submitFront} onChange={ e => setSubmitFront(e.target.value)}></input>
                        <label>Answer</label>
                        <input type='text' placeholder="Enter answer" value={submitBack} onChange={ e => setSubmitBack(e.target.value)}></input>
                    </section>
                    <span style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{numCards} cards</span>
                    <button type='button' onClick={e => handlePlus(e)}>+</button>

                    { submitted && <h4 style={{color: '#04a404'}}>The form has been submitted!</h4> }
                    { empty && <h4 style={{color: '#fc472e'}}>Please fill out all the fields.<img src={AlertIcon} alt='Alert icon' aria-label="Alert icon" className="alert"/></h4> }
                    
                    <button type="submit" form="topicForm" name="Add Topic">Add Quizz</button>
                </form>
            </section>
        </div>
    )
}