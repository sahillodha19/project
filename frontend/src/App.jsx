import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard';
import Authenticate from './components/Authenticate';
import ProductDetails from './components/ProductDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CartPage from './components/CartPage/CartPage';
import OrderPage from './components/OrderPage/OrderPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orderpage" element={<OrderPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
      <Footer />
    </Router>
    </>
  )
}

export default App
