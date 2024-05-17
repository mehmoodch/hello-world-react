import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Updated backend service URL
  const backendServiceURL = 'http://backend.development.internal:3000/api/items';

  useEffect(() => {
    fetch(backendServiceURL)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [backendServiceURL]);

  const handleCreateItem = () => {
    if (newItem) {
      fetch(backendServiceURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItem }),
      })
        .then(response => response.json())
        .then(data => {
          setItems([...items, data]);
          setNewItem('');
        })
        .catch(error => console.error('Error creating item:', error));
    }
  };

  return (
    <div>
      <h1>CRUD App with Fetch API and CORS</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="New Item"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
        <button onClick={handleCreateItem}>Add Item</button>
      </div>
    </div>
  );
}

export default App;
