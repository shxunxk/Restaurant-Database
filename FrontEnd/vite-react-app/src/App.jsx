import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="login">
          <Route index element={<Login text1='Enter Username' text2 = 'Enter Password' text4='New to this site'/>}/>
        </Route>
        <Route path="signin">
          <Route index element={<Login text1='Enter Email or Phone Number' text2 = 'Enter Password' text3 = 'Renter Password' text4='Already signed in'/>}/>
        </Route>
        <Route path="home">
          <Route index element={<Home />}/>
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
