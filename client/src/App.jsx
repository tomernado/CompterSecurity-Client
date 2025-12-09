import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// שינוי קריטי: הוספת שם התיקייה + שם הקובץ + הסיומת .jsx
import Login from './components/Login/Login.jsx'; 
import Register from './components/Register/Register.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';

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