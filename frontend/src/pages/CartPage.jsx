import { useEffect, useState } from 'react';
import {
  getCart,
  updateCartItem,
  removeCartItem
} from '../services/cartService';
import { placeOrder } from '../services/orderService';
import btn from '../styles/button.module.css';

const CartPage = () => {
  const [cartData, setCartData] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const res = await getCart();
      setCartData(res.data || { items: [] });
    } catch (error) {
      console.error('Failed to load cart:', error);
      setCartData({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleUpdate = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartItem(productId, quantity);
      loadCart();
    } catch (error) {
      alert('Failed to update cart item');
    }
  };

  const handleRemove = async (productId) => {
    if (!confirm('Remove this item from cart?')) return;
    try {
      await removeCartItem(productId);
      loadCart();
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    try {
      await placeOrder();
      alert('🎉 Order placed successfully!');
      loadCart();
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Shopping Cart</h2>
        <span className="cart-count">{cartData.items?.length || 0} Items</span>
      </div>

      {!cartData.items || cartData.items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '2rem' }}>
            {cartData.items.map((item) => (
              <div key={item.productId || item._id} className="cart-item">
                
                <div className="cart-item-details">
                  <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    Product ID: {item.productId}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="quantity-control">
                  <button 
                    onClick={() => handleUpdate(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val > 0) handleUpdate(item.productId, val);
                    }}
                  />
                  <button onClick={() => handleUpdate(item.productId, item.quantity + 1)}>
                    +
                  </button>
                </div>

                <button 
                  onClick={() => handleRemove(item.productId)} 
                  className={`${btn.btn} ${btn.danger}`}
                  style={{ minWidth: '100px' }}
                >
                  🗑️ Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
          }}>
            <button 
              onClick={handleCheckout} 
              className={`${btn.btn} ${btn.primary}`}
              style={{ minWidth: '250px', padding: '1rem 2rem', fontSize: '1rem' }}
            >
              🚀 Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;