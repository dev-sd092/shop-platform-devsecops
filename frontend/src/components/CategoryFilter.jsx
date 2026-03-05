import { useState } from 'react';

const CategoryFilter = ({ categories, onSelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSelect = (id) => {
    setActiveCategory(id);
    onSelect(id);
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
          onClick={() => handleSelect(cat._id)}
          className={activeCategory === cat._id ? 'active' : ''}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;