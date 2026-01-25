import { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '../services/productService';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import card from '../styles/productCard.module.css';

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetchCategories(),
          fetchProducts()
        ]);
        setCategories(categoriesRes.data || []);
        setProducts(productsRes.data || []);
      } catch (error) {
        console.error('Failed to load data:', error);
        setCategories([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCategorySelect = async (slug) => {
    setSelectedCategory(slug);
    setLoading(true);
    try {
      const res = await fetchProducts(slug);
      setProducts(res.data || []);
    } catch (error) {
      console.error('Failed to filter products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '0.5rem 0' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '2.25rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, var(--primary-light), var(--accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          Product Catalog
        </h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1rem'
        }}>
          Discover our amazing collection of {products.length} products
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter 
        categories={categories} 
        onSelect={handleCategorySelect} 
      />

      {/* Loading State */}
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No products found</h3>
          <p>
            {selectedCategory 
              ? 'Try selecting a different category' 
              : 'No products available at the moment'}
          </p>
        </div>
      ) : (
        /* Product Grid - Responsive Layout */
        <div>
          <div style={{ 
            marginBottom: '1rem', 
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>
              {selectedCategory 
                ? `Showing ${products.length} products in category` 
                : `Showing all ${products.length} products`}
            </span>
          </div>

          <div className={card.cardGrid}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Info Banner */}
      {products.length > 0 && (
        <div style={{
          marginTop: '2.5rem',
          padding: '1.25rem',
          background: 'var(--card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <p style={{ 
            margin: 0, 
            color: 'var(--text-secondary)',
            fontSize: '0.875rem'
          }}>
            ✨ Free shipping on all orders • 30-day return policy • Secure payments
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;