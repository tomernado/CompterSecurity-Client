import './App.css'
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Login from './compoments/Login'
import Register from './compoments/Register/Register';

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
