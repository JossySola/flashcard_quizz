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
    
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='topics' element={<Topics />}>
              <Route path='new' element={<TopicForm />}/>
            </Route>
            <Route path='quizzes' element={<Quizzes />}>
              <Route path='topic' element={<Outlet />}>
                <Route path=':topicId' element={<Topic />}/>
              </Route>
              <Route path=':quizzId' element={<Quizz />}/>
              <Route path='new' element={<QuizzForm />}/>
            </Route>
          </Route>
        </Routes>
      </Provider>
    
  </BrowserRouter>
)
