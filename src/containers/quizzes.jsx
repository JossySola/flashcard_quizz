import React from "react"
import { Link, Outlet } from "react-router-dom"
import { List } from "./components/list"
import '../../src/App.css'

export function Quizzes() {
    return (
        <div>
            <h1>Quizzes</h1>
            <div className="button">
                <Link to='/quizzes/new'>New Quizz</Link>
            </div>
            <Outlet />
            <List from='quizzes'/>
        </div>
    )
}