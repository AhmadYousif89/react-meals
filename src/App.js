import React from 'react';
import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Modal from './components/UI/Modal/Modal';
import CartProvider from './store/Cart/CartProvider';

const App = () => {
  const [showCart, setShowCart] = useState(false);

  const handleCartOpen = () => {
    setShowCart(true);
  };
  const handleCartClose = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && (
        <Modal onClick={handleCartClose}>
          <Cart onCartClose={handleCartClose} />
        </Modal>
      )}
      <main>
        <Header onCartOpen={handleCartOpen} />
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
