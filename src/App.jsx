import { Outlet, NavLink } from 'react-router-dom'
import './App.css'

export default function App() {

  return (
    <div>
      <nav>
        <ul>
          <li><NavLink
          style={({isActive}) => {
            return {
              blackgroundColor: isActive ? "#9830f9" : ""
            }
          }}
          to='topics'>Topics</NavLink></li>

          <li><NavLink
          style={({isActive}) => {
            return {
              blackgroundColor: isActive ? "#9830f9" : ""
            }
          }}
          to='quizzes'>Quizzes</NavLink></li>

          <li><NavLink
          style={({isActive}) => {
            return {
              blackgroundColor: isActive ? "#9830f9" : ""
            }
          }}
          to='quizzes/new'>New Quizz</NavLink></li>
        </ul>
      </nav>

      <Outlet />
    </div>
  )
}
