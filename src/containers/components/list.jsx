import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectList, loadListAsync, isLoading, isFailing } from './slices/listSlice'
import './styles/listStyle.css'

export function List() {
    const dispatch = useDispatch()
    const list = useSelector(selectList)
    const loading = useSelector(isLoading)
    const failed = useSelector(isFailing)
    const param = useParams()
    const currentParam = () => {
        if(param.topics) {
            return param.topics
        } else if(param.quizzes) {
            return param.quizzes
        }
    }
    const paramName = currentParam()

    useEffect(() => {
        dispatch(loadListAsync())
    }, [])
    
    return (
        <div>
            <ul>
                {loading && <li className="loadingItem"><h3>Loading...</h3></li>}
                {failed && <li className="failedItem"><h3>Failed to load item.</h3><img src="./src/assets/alert.svg" alt="Alert icon" aria-label="Alert icon"/></li>}
                
                {
                    list[paramName].map((item, index) => {
                        return <li key={index} className='listItem'><Link to={`/quizzes/${item.id}`}><h3>{item.name}</h3><p>by {item.author}</p></Link></li>
                    })
                }
            </ul>   
        </div>
    )
}