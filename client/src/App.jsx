<<<<<<< HEAD
import './App.css'
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Login from './components/Login/Login'
import Register from './components/Register';
import HomePage from './components/HomePage';
import ForgotPassword from './components/ForgotPassword';
=======
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// שינוי קריטי: הוספת שם התיקייה + שם הקובץ + הסיומת .jsx
import Login from './components/Login/Login.jsx'; 
import Register from './components/Register/Register.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
>>>>>>> 5bcb1cfe5f4ed2622d02232a6d1d8a362caaac23

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