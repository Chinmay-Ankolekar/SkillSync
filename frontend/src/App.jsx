import { useState, useEffect } from 'react'
import Login from './auth/Login'
import Signup from './auth/Signup'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import UserDashboard from './components/UserDashboard'
import AddJob from './components/AddJob'
import ApplyJobs from './components/ApplyJobs'
import AppliedCandidates from './components/AppliedCandidates'
import PythonQuiz from './components/PythonQuiz'
import JavaScriptQuiz from './components/JavaScriptQuiz'
import {  Route,  Routes  } from 'react-router-dom'

function App() {
  const [token, setToken] = useState(false)


  if(token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token'))
   {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
      
    }
  },[] )
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path={'/python'} element={<PythonQuiz />} />

        {token ? (
        <>
          <Route path={'/dashboard'} element={<Dashboard token={token}/>} />
          <Route path={'/userdashboard'} element={<UserDashboard token={token}/>} />
          <Route path={'/addjob'} element={<AddJob token={token}/>} />
          <Route path={'/jobs/:id'} element={<ApplyJobs token={token}/>} />
          <Route path={'/appliedcandidates/:id'} element={<AppliedCandidates token={token}/>} />
          
          <Route path={'/JavaScriptQuestion'} element={<JavaScriptQuiz token={token}/>} />
        </>
      ) : (
         <>
        
        </> 
      )} 
      </Routes>
    </>
  )
}

export default App
