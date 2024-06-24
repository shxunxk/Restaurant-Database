import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Menu from './Pages/Menu'
import About from './Pages/About'
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Orders from './Pages/Orders';
import Bill from './Pages/Bill';
import Customer from './Pages/Customer';
import TakeOrder from './Pages/TakeOrder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login">
          <Route index element={<Login text1='Enter Username' text2 = 'Enter Password' text4='New to this site' but='Log In'/>}/>
        </Route>
        <Route path="signin">
          <Route index element={<Login text1='Enter Email or Phone Number' text2 = 'Enter Password' text3 = 'Renter Password' text4='Already signed in' but='Sign In'/>}/>
        </Route>
        <Route path="menu">
          {/* <Navbar/> */}
          <Route index element={<Menu />}/>
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="orders">
          {/* <Navbar/> */}
          <Route index element={<Orders />}/>
          <Route path="newOrder" element={<TakeOrder />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="bill">
          {/* <Navbar/> */}
          <Route index element={<Bill />}/>
          {/* <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} /> */}
        </Route>
        <Route path="customers">
          {/* <Navbar/> */}
          <Route index element={<Customer/>}/>
          {/* <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App
