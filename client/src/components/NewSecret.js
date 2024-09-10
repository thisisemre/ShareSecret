import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NewSecret.css'

function NewSecret({ onSecretAdded }) {
  const [secret, setSecret] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/secret', { secret, username });
      onSecretAdded(); // Yeni sır eklendiğinde üst bileşeni bilgilendir
    } catch (error) {
      console.error('Error adding secret:', error);
    }
  };

  return (
    <div className='new-secret-container'>
      <h2>Add new secret to see 3 secrets</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Secret:</label>
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}

export default NewSecret;
