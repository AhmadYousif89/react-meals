import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
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
      {showCart && <Cart onCartClose={handleCartClose} />}
      <main>
        <Header onCartOpen={handleCartOpen} />
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
