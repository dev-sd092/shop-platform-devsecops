import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProtectedRoute from './components/ProtectedRoute';
import { logout, isAuthenticated } from './utils/auth';
import styles from './styles/navbar.module.css';
import layout from './styles/layout.module.css';
import './App.css';

function App() {
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      window.location.href = '/login';
    }
  };

  return (
    <BrowserRouter>
      <div className={layout.app}>
        <nav className={styles.nav}>
          <div className={styles.inner}>
            {isAuthenticated() ? (
              <>
                <div className={styles.brand}>
                  <div className={styles.brandIcon}>🛍️</div>
                  <span>ShopHub</span>
                </div>
                
                <Link to="/" className={styles.link}>
                  Products
                </Link>
                
                <Link to="/cart" className={styles.link}>
                  🛒 Cart
                </Link>
                
                <Link to="/orders" className={styles.link}>
                  📦 Orders
                </Link>
                
                <div className={styles.spacer} />
                
                <button onClick={handleLogout}>
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <div className={styles.brand}>
                  <div className={styles.brandIcon}>🛍️</div>
                  <span>ShopHub</span>
                </div>
                
                <div className={styles.spacer} />
                
                <Link to="/login" className={styles.link}>
                  Login
                </Link>
                
                <Link to="/register" className={styles.link}>
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className={layout.container}>
          <Routes>
            <Route 
              path="/login" 
              element={<Login onLogin={() => window.location.href = '/'} />} 
            />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ProductPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;