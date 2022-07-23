import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import { addTopic, selectTopics } from './slices/listSlice'
import AlertIcon from '../../assets/alert.svg'
import './styles/form.css'

export function TopicForm() {
    const dispatch = useDispatch()
    const topics = useSelector(selectTopics)
    const [topic, setTopic] = useState('')
    const [author, setAuthor] = useState('')
    const [submitted, setSubmit] = useState(false)
    const [duplicate, setDuplicate] = useState(false)
    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        let alreadyExist = false
        topics.forEach(element => {
            if(element.name.toLowerCase() === topic.toLowerCase()) {
                alreadyExist = true
            }
        });
        setDuplicate(alreadyExist)
    }, [topic])

    const setNewTopic = (e) => {
        e.preventDefault()
        const topicId = uuidv4()

        if(!duplicate && topic && author) {
            dispatch(addTopic({
                id: topicId,
                name: topic,
                author: author
            }))
    
            setTopic('')
            setAuthor('')
            setSubmit(true)
            setDuplicate(false)
        } else {
            setEmpty(true)
        }
    }

    return (
        <div>
            <section>
                <h1>New Topic</h1>

                <form id='topicForm' onSubmit={e => setNewTopic(e)}>
                    <label>Topic:</label>
                    { duplicate && <h4 style={{color: '#fc472e'}}>The topic already exists.<img src={AlertIcon} alt='Alert icon' aria-label="Alert icon" className="alert"/></h4> }
                    <input type='text' placeholder="Enter topic" value={topic} onChange={e => setTopic(e.target.value)}></input>
                    <label>Author:</label>
                    <input type='text' placeholder="Enter author" value={author} onChange={e => setAuthor(e.target.value)}></input>
                    <button type="submit" form="topicForm" name="Add Topic">Add Topic</button>
                    { submitted && <h4 style={{color: '#04a404'}}>The form has been submitted!</h4> }
                    { empty && <h4 style={{color: '#fc472e'}}>Please fill out all the fields.<img src={AlertIcon} alt='Alert icon' aria-label="Alert icon" className="alert"/></h4> }
                </form>
            </section>
        </div>
    )
}