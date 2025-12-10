import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login/Login'; 
import Register from './components/Register/Register';
import HomePage from './components/HomePage/HomePage';
import ChangePassword from './components/Password/ChangePassword';
import ResetPassword from './components/Password/ResetPassword';
import ForgotPassword from './components/Password/ForgotPassword';

const App = () => {
  return (
    <div className="page-container">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/homePage' element={<HomePage/>}/>
          <Route exact path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route exact path='/changePassword' element={<ChangePassword/>}/>
          <Route exact path='/resetPassword' element={<ResetPassword/>}/>
        </Routes> 
      </Router>
    </div>
  )
}

export default App;