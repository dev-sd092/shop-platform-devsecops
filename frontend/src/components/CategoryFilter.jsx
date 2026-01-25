import { useState } from 'react';

const CategoryFilter = ({ categories, onSelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSelect = (slug) => {
    setActiveCategory(slug);
    onSelect(slug);
  };

  return (
    <div className="category-filter">
      <button 
        onClick={() => handleSelect(null)}
        className={activeCategory === null ? 'active' : ''}
      >
        All Products
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => handleSelect(cat.slug)}
          className={activeCategory === cat.slug ? 'active' : ''}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;