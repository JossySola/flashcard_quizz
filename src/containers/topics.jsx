import React from "react"
import { Link, Outlet } from "react-router-dom"
import { List } from "./components/list"
import '../../src/App.css'

export function Topics() {

    return (
        <div>
            <h1>Topics</h1>
            <div className="button">
                <Link to='/topics/new'>New Topic</Link>
            </div>
            <List />
            <Outlet />
        </div>
    )
}