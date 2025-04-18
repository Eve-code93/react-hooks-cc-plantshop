import React, { useState } from 'react';


function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = {
      name: formData.name.trim(),
      image: formData.image.trim(),
      price: parseFloat(formData.price)
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
      .then((r) => r.json())
      .then(onAddPlant)
      .catch((error) => {
        console.error("Error adding plant:", error);
        alert("Something went wrong while adding the plant.");
      });

    setFormData({
      name: "",
      image: "",
      price: ""
    });
  };

  return (
    <form className="new-plant-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Plant name (e.g., Calathea)"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        step="0.01"
        required
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;
