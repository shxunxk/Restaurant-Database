import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Cart from './Pages/Cart';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login">
          <Route index element={<Login />}/>
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
