import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login/Login'; 
import Register from './components/Register/Register';
import HomePage from './components/HomePage/HomePage';
import ChangePassword from './components/Password/ChangePassword';
import ResetPassword from './components/Password/ResetPassword';
import ForgotPassword from './components/Password/ForgotPassword';
import DisplayCustomers from './components/Customers/DisplayCustomers';
import Navbar from './components/Navbar/Navbar';
import { SafeModeProvider } from './contexts/SafeModeContext';

const App = () => {
  return (
    <SafeModeProvider>
      <div className="page-container">

      <Navbar />

        <Router>
          <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/homePage' element={<HomePage/>}/>
            <Route exact path='/customers' element={<DisplayCustomers/>}/>
            <Route exact path='/forgotPassword' element={<ForgotPassword/>}/>
            <Route exact path='/changePassword' element={<ChangePassword/>}/>
            <Route exact path='/resetPassword' element={<ResetPassword/>}/>
          </Routes> 
        </Router>
      </div>
    </SafeModeProvider>
  )
}

export default App;