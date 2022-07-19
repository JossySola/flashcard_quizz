import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { selectList, isLoading, isFailing, deleteTopic, deleteQuizz } from './slices/listSlice'
import './styles/listStyle.css'
import AlertIcon from '../../assets/alert.svg'

export function List({from}) {
    const dispatch = useDispatch()
    const list = useSelector(selectList) // Gets the states of the List Slice
    const loading = useSelector(isLoading) // State of the Async Operation on List Slice
    const failed = useSelector(isFailing) // State of the Async Operation on List Slice

    function matchTopic(topicID) {
        let match = [];
        
        list.topics.map((object) => {
            if(object.id === topicID) {
                match = object.name
            }
        });
        
        return match
    }

    return (
        <div>
            <ul>
                {loading && <li className="loadingItem"><h3>Loading...</h3></li>}
                {failed && <li className="failedItem"><h3>Failed to load item.</h3><img src={AlertIcon} alt="Alert icon" aria-label="Alert icon"/></li>}
                {
                    from === 'topics' ? list[from].map((item, index) => {
                        return <li key={index} className='listItem' id={item.id}><Link to={`/quizzes/${item.id}`}><h3>{item.name}</h3><p>by {item.author}</p></Link><button aria-label="Remove list item" onClick={(e) => { e.preventDefault(); dispatch(deleteTopic(item.id))}}>X</button></li>
                    }) : null
                }
                {
                    from === 'quizzes' ? list[from].map((item, index) => {
                            return <li key={index} className='listItem' id={item.id}><Link to={`/quizzes/${item.id}`}><h4>{item.name} Quizz</h4><h5>From the <span>{matchTopic(item.topicId)}</span> topic</h5><p>by {item.author}</p></Link><button aria-label="Remove list item" onClick={(e) => { e.preventDefault(); dispatch(deleteQuizz(item.id))}}>X</button></li>
                    }) : null
                }
            </ul>   
        </div>
    )
}