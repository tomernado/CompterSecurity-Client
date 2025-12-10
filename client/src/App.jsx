import './App.css'
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Login from './components/Login/Login'
import Register from './components/Register';
import HomePage from './components/HomePage';
import ForgotPassword from './components/ForgotPassword';

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/homePage' element={<HomePage/>}/>
          <Route exact path='/forgotPassword' element={<ForgotPassword/>}/>
        </Routes> 
      </Router>
    </>
  )
}

export default App;
