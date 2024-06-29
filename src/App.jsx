import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/authentication/Signup'
import Empty from './components/Empty'
import Examquestions from './pages/Examquestions'
import SolveQuestion from './components/SolveQuestion'
import { QuestionProvider } from './context/Context'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-900' >
    <QuestionProvider>
    <Empty/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/questions" element={<Examquestions/>}/>
        <Route exact path="/solvequestion/:type" element={<SolveQuestion/>}/>
      </Routes>
      </QuestionProvider>
    </div>
  )
}

export default App
