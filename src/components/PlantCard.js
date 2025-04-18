import React from 'react';

function PlantCard({ plant, onToggleSoldOut }) {
  // Ensure price is properly formatted
  const formattedPrice = plant.price 
    ? `$${Number(plant.price).toFixed(2)}`
    : 'Price not available';

  return (
    <div className="plant-card" data-testid="plant-item">
      {plant.image && (
        <img 
          src={plant.image} 
          alt={plant.name || 'Plant'} 
          className="plant-image"
          onError={(e) => {
            e.target.style.display = 'none'; // Hide if image fails to load
          }}
        />
      )}
      <div className="plant-details">
        <h3>{plant.name || 'Unnamed Plant'}</h3>
        <p>Price: {formattedPrice}</p>
        <button 
          onClick={() => onToggleSoldOut(plant.id)}
          className={`stock-btn ${plant.soldOut ? 'out-of-stock' : 'in-stock'}`}
        >
          {plant.soldOut ? 'Out of Stock' : 'In Stock'}
        </button>
      </div>
    </div>
  );
}

export default PlantCard;