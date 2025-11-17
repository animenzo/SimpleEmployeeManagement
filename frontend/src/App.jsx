import React from 'react'
import EmployeeManagementApp from './components/EmployeeManagementApp'
import EmployeeDetails from './components/EmployeeDetails'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="employee"/>}></Route>
          <Route path='/employee' element={<EmployeeManagementApp/>}></Route>
          <Route path='/employee/:id' element={<EmployeeDetails/> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
