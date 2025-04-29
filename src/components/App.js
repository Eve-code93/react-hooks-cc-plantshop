// src/components/App.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import PlantList from './PlantList';
import NewPlantForm from './NewPlantForm';
import Search from './Search';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://react-hooks-cc-plantshop-2-ymci.onrender.com/plants")
      .then(r => r.json())
      .then(plantData => {
        // Filter plants to only include those with images
        const plantsWithImages = plantData.filter(plant => 
          plant.image && plant.image.trim() !== ""
        );
        setPlants(plantsWithImages);
      });
  }, []);

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const toggleSoldOut = (id) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    ));
  };

  const displayedPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <main>
        <NewPlantForm onAddPlant={addPlant} />
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <PlantList 
          plants={displayedPlants} 
          onToggleSoldOut={toggleSoldOut} 
        />
      </main>
    </div>
  );
}

export default App;