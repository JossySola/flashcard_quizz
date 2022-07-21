import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import { addQuizz, selectQuizzes, selectTopics } from './slices/listSlice'
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

        if(!duplicate) {
            dispatch(addQuizz({
                id: quizzId,
                topicId: topic,
                name: quizz,
                author: author
            }))
    
            setQuizz('')
            setTopic('')
            setAuthor('')
            setSubmit(true)
            setDuplicate(false)
        }
    }

    return (
        <div>
            <section>
                <h1>New Quizz</h1>

                <form id='topicForm' onSubmit={e => setNewQuizz(e)}>
                    <label>Quizz name:</label>
                    { duplicate && <h4 style={{color: '#fc472e'}}>The quizz already exists.</h4> }
                    <input type='text' placeholder="Enter topic" value={quizz} onChange={e => setQuizz(e.target.value)}></input>

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
                    <button type="submit" form="topicForm" name="Add Topic">Add Quizz</button>
                    { submitted && <h4 style={{color: '#04a404'}}>The form has been submitted!</h4> }
                </form>
            </section>
        </div>
    )
}