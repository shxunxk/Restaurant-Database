import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'

function App() {

  return (
    <Router basename='/home'>
      {/* <div>
        <Link to="/">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
        <Link to="/react">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </Link>
      </div> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
