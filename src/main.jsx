import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './store'
import { Topics } from './containers/topics'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path=':topics' element={<Topics />}>
              <Route path=':topicId'/>
              <Route path='new'/>
            </Route>
            <Route path=':quizzes'>
              <Route path=':quizzId'/>
              <Route path='new'/>
            </Route>
          </Route>
        </Routes>
      </Provider>
    
  </BrowserRouter>
)
