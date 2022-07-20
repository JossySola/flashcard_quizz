import React from "react"
import { List } from "./list"
import { useParams } from "react-router-dom"

export function Topic() {
    const param = useParams()
    const topicId = param.topicId

    return (
        <div>
            <h3>Filtered by the topic selected:</h3>
            <List from='topic' topicId={topicId}/>
        </div>
    )
}