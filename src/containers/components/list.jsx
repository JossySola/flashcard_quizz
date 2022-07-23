import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { selectList, isLoading, isFailing, deleteTopic, deleteQuizz, selectQuizzesByTopic } from './slices/listSlice'
import './styles/listStyle.css'
import AlertIcon from '../../assets/alert.svg'

export function List({from, topicId}) {
    const dispatch = useDispatch()
    const list = useSelector(selectList) // Gets the states of the List Slice
    const loading = useSelector(isLoading) // State of the Async Operation on List Slice
    const failed = useSelector(isFailing) // State of the Async Operation on List Slice

    const giveTopicId = selectQuizzesByTopic(topicId)
    const filteredByTopic = useSelector(giveTopicId)

    function matchTopic(topicID) {
        let match = [];
        
        list.topics.map((object) => {
            if(object.id === topicID) {
                match = object.name
            }
        });
        
        if(match.length > 0) {
            return match
        } else {
            return false
        }
    }

    return (
        <div>
            <ul>
                {loading && <li className="loadingItem"><h3>Loading...</h3></li>}
                {failed && <li className="failedItem"><h3>Failed to load item.</h3><img src={AlertIcon} alt="Alert icon" aria-label="Alert icon"/></li>}
                {list[from] && list[from].length === 0 ? <h3 style={{color: '#fc472e'}}>There is no content</h3> : <div></div>}
                {
                    from === 'topics' ? list[from].map((item, index) => {
                        return <li key={index} className='listItem' id={item.id}>
                                <Link to={`/quizzes/topic/${item.id}`}>
                                    <h3>{item.name}</h3>
                                    <p>by {item.author}</p>
                                </Link>
                                <button aria-label="Remove list item" onClick={(e) => { e.preventDefault(); dispatch(deleteTopic(item.id))}}>X</button>
                                </li>
                    }) : null
                }
                { 
                    from === 'topic' ? filteredByTopic.map((item, index) => {
                        return <li key={index} id={item.id} className='listItem' style={{border: '3px solid #892be29a'}}>
                                <Link to={`/quizzes/${item.id}`}>
                                    <h4>{item.name} Quizz</h4>
                                    <h5>From the {matchTopic(item.topicId) ? <span>{matchTopic(item.topicId) + ' topic'}</span> : <span style={{color: "#fc472e", fontSize: "1.2rem", fontStyle: "italic", fontWeight: "normal"}}>[ the topic was deleted ]</span>}</h5>
                                    <p>by {item.author}</p>
                                </Link>
                                <button aria-label="Remove list item" onClick={(e) => { e.preventDefault(); dispatch(deleteQuizz(item.id))}}>X</button>
                                </li>
                    }) : null
                }
                { from === 'topic' && filteredByTopic.length === 0 ? <h3 style={{color: '#fc472e'}}>No quizzes in this topic yet</h3> : <div></div> }
                {
                    from === 'quizzes' ? list[from].map((item, index) => {
                        return <li key={index} className='listItem' id={item.id}>
                            <Link to={`/quizzes/${item.id}`}>
                                <h4>{item.name} Quizz</h4>
                                <h5>From the {matchTopic(item.topicId) ? <span>{matchTopic(item.topicId) + ' topic'}</span> : <span style={{color: "#fc472e", fontSize: "1.2rem", fontStyle: "italic", fontWeight: "normal"}}>[ the topic was deleted ]</span>}</h5>
                                <p>by {item.author}</p>
                            </Link>
                            <button aria-label="Remove list item" onClick={(e) => { e.preventDefault(); dispatch(deleteQuizz(item.id))}}>X</button>
                            </li>
                    }) : null
                }
            </ul>   
        </div>
    )
}