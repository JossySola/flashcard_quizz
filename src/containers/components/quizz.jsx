import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectQuizzes, selectTopics } from "./slices/listSlice"
import { Card } from "./card"

export function Quizz() {
    const param = useParams()
    const thisQuizz = param.quizzId
    const quizzes = useSelector(selectQuizzes)
    const topics = useSelector(selectTopics)
    const topicID = () => {
        let id = ''
        quizzes.map((element) => {
            if(thisQuizz === element.id) {
                id = element.topicId
            }
        })
        return id
    }
    const topicName = () => {
        let name = ''
        topics.map((element) => {
            if(element.id === topicID()) {
                name = element.name
            }
        })
        return name
    }
    const quizzName = () => {
        let name = ''
        quizzes.map((element) => {
            if(element.id === thisQuizz) {
                name = element.name
            }
        })
        return name
    }
    // State for current card displayed, front and back
    // Function to display one card at a time, arrows <Card>

    return (
        <div>
            <h2>{topicName()}</h2>
            <h1>{quizzName()}</h1>

            <section>
                <Card quizzId={thisQuizz} />
            </section>
        </div>
    )
}