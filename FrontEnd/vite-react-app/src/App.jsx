import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Menu from './Pages/Menu';
import Login from './Pages/Login';
import Orders from './Pages/Orders';
import Bill from './Pages/Bill';
import Customer from './Pages/Customer';
import TakeOrder from './Pages/TakeOrder';
import Navbar from './Components/Navbar';
import OrderItems from './Pages/OrderItems';
import Start from './Pages/Start';
import Account from './Pages/Account';
import Cookies from 'js-cookie';
import UserManagement from './Pages/UserManagement';



function App() {

  const user = JSON.parse(Cookies.get('user')||null);

  return (
    <Router>
      {user && <div className='z-2 pb-20 '>
        <Navbar />
      </div>}
      <div className="z-1"> {/* Add padding to this div if needed */}
      <Routes>
          <Route path="/" element={<Start />} />
          <Route path="login/:type" element={<Login text="New to this site" but="Log In" />} />
          <Route path="signin" element={<Login text="Already signed in" but="Sign In" />} />
          {user &&
          <>
            <Route path="/myAccount" element={<Account />} />
            <Route path="/myAccount/:id" element={<Account />} />
            <Route path="menu" element={<Menu />}></Route>
            <Route path="newOrder" element={<TakeOrder />} />
            <Route path="orders" element={<Orders />}/>
            <Route path="orderItems/:id" element={<OrderItems />} />
            <Route path="bill" element={<Bill />} />
            <Route path="customers" element={<Customer />} />
            <Route path="userManagement" element={<UserManagement />} />
          </>
          }
        </Routes>
        

      </div>
    </Router>
  );
}

export default App;
