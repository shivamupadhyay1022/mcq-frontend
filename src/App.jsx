import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/authentication/Signup'
import Empty from './components/Empty'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-900' >
    <Empty/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App
