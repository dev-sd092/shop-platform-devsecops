import { useEffect, useState } from 'react';
import { fetchOrders } from '../services/orderService';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetchOrders();
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '2rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, var(--primary-light), var(--accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          Your Orders
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Track and manage your orders
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h3>No orders yet</h3>
          <p>Start shopping to see your orders here!</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <div className="order-id">Order ID: {order._id}</div>
                {order.createdAt && (
                  <div style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: '0.875rem',
                    marginTop: '0.25rem' 
                  }}>
                    {formatDate(order.createdAt)}
                  </div>
                )}
              </div>
              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <div>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontWeight: '600',
                marginBottom: '0.75rem' 
              }}>
                Order Items:
              </p>
              <ul className="order-items">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    <span>
                      <strong>{item.name || `Product ${item.productId}`}</strong>
                      <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                        × {item.quantity}
                      </span>
                    </span>
                    <span>₹{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-total">
              <span>Total Amount</span>
              <span className="amount">₹{order.totalAmount}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;