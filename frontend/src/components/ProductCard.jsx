import { useState } from 'react';
import { addToCart } from '../services/cartService';
import btn from '../styles/button.module.css';
import card from '../styles/productCard.module.css';

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product._id, 1);
      alert('Added to cart successfully! 🛒');
    } catch (error) {
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={card.card}>
      <div className={card.imgWrapper}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={card.img}
        />
        {product.badge && (
          <span className={`${card.badge} ${card[product.badge.toLowerCase()]}`}>
            {product.badge}
          </span>
        )}
      </div>
      
      <div className={card.cardContent}>
        <h4 className={card.title}>{product.name}</h4>
        
        {product.description && (
          <p className={card.description}>{product.description}</p>
        )}
        
        <div className={card.priceRow}>
          <p className={card.price}>₹{product.price}</p>
          {product.oldPrice && (
            <p className={card.oldPrice}>₹{product.oldPrice}</p>
          )}
        </div>

        {product.rating && (
          <div className={card.rating}>
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={i < Math.floor(product.rating) ? card.star : `${card.star} ${card.empty}`}
              >
                ★
              </span>
            ))}
            {product.ratingCount && (
              <span className={card.ratingCount}>({product.ratingCount})</span>
            )}
          </div>
        )}
      </div>

      <div className={card.cardFooter}>
        <button 
          onClick={handleAddToCart} 
          className={`${btn.btn} ${btn.primary}`}
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;