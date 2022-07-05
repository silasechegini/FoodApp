import React, { useState } from 'react';
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/ContextApi';
// import classes from './App.module.css';

function App() {
  const [showCart, setShowCart] = useState(false)
  const cartButtonHandler = (event) => {
    event.preventDefault();
    setShowCart(!showCart);
  }
  const onCloseCartHandler = (event) => {
    event.preventDefault();
    setShowCart(!showCart);
  }
  return (
    <CartProvider>
      {showCart && <Cart onClick={onCloseCartHandler} />}
      <Header onClick={cartButtonHandler} />
      <main>
        <Meals />
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
