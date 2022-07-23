import React, { useEffect } from "react"
import { Outlet, NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { loadListAsync } from './containers/components/slices/listSlice'
import { loadQuizzesAsync } from './containers/components/slices/quizzSlice'
import './App.css'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadListAsync()) // Only for the first render, loads a default list located in a JSON file
    dispatch(loadQuizzesAsync())
  }, [])

  return (
    <div>
      <nav>
        <ul>
          <li><NavLink
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#9830f9" : "",
            };
          }}
          to='topics'>Topics</NavLink></li>

          <li><NavLink
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#9830f9" : "",
            };
          }}
          to='quizzes'>Quizzes</NavLink></li>

          <li><NavLink
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#9830f9" : "",
            };
          }}
          to='quizzes/new'>New Quizz</NavLink></li>
        </ul>
      </nav>

      <Outlet />
    </div>
  )
}
