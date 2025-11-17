import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './compoments/Login'

const App = () => {
  const [count, setCount] = useState(0)
  let x = 7

  return (
    <>

      <Login number={count}/>

    </>
  )
}

export default App
