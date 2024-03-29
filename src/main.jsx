import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {Routes, Route, BrowserRouter, Outlet } from 'react-router-dom'
import App from './App'
import { store } from './store'
import { Topics } from './containers/topics'
import { Quizzes } from './containers/quizzes'
import { Topic } from './containers/components/topic'
import { TopicForm } from './containers/components/topicForm'
import { Quizz } from './containers/components/quizz'
import { QuizzForm } from './containers/components/quizzForm'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <Routes>
          <Route path='flashcard_quizz/' element={<App />}>
            <Route path='*' element={<h1>Nothing found</h1>}/>
            <Route path='topics/new' element={<TopicForm />}/>
            <Route path='quizzes/new' element={<QuizzForm />}/>

            <Route path='topics' element={<Topics />} >
              <Route path='topic' element={<Outlet />}>
                <Route path=':topicId' element={<Topic />}/>
              </Route>
            </Route>

            <Route path='quizzes' element={<Quizzes />}>
              <Route path='topic' element={<Outlet />}>
                <Route path=':topicId' element={<Topic />}/>
              </Route>
            </Route>
            
            <Route path='quizzes/:quizzId' element={<Quizz />}/>
          </Route>
        </Routes>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
)
