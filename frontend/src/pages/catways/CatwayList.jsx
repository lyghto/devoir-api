import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CatwayList = () => {
  const [catways, setCatways] = useState([]);
  const [newCatway, setNewCatway] = useState({
    catwayNumber: '',
    catwayType: '',
    catwayState: ''
  });
  const [editCatwayId, setEditCatwayId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/catways')
      .then(res => setCatways(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/catways/${id}`)
      .then(() => setCatways(prev => prev.filter(c => c._id !== id)))
      .catch(err => console.error(err));
  };

  const handleUpdate = (id, updatedCatway) => {
    axios.put(`http://localhost:8080/api/catways/${id}`, updatedCatway)
      .then(res => {
        setCatways(prev => prev.map(c => c._id === id ? res.data : c));
        setEditCatwayId(null);
      })
      .catch(err => console.error(err));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/catways', newCatway)
      .then(res => {
        setCatways(prev => [...prev, res.data]);
        setNewCatway({ catwayNumber: '', catwayType: '', catwayState: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Liste des Catways</h2>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Numéro"
          value={newCatway.catwayNumber}
          onChange={e => setNewCatway({ ...newCatway, catwayNumber: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={newCatway.catwayType}
          onChange={e => setNewCatway({ ...newCatway, catwayType: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="État"
          value={newCatway.catwayState}
          onChange={e => setNewCatway({ ...newCatway, catwayState: e.target.value })}
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {catways.map(catway => (
          <li key={catway._id}>
            {editCatwayId === catway._id ? (
              <>
                <input
                  type="text"
                  value={catway.catwayNumber}
                  onChange={(e) =>
                    setCatways(prev =>
                      prev.map(c =>
                        c._id === catway._id ? { ...c, catwayNumber: e.target.value } : c
                      )
                    )
                  }
                />
                <input
                  type="text"
                  value={catway.catwayType}
                  onChange={(e) =>
                    setCatways(prev =>
                      prev.map(c =>
                        c._id === catway._id ? { ...c, catwayType: e.target.value } : c
                      )
                    )
                  }
                />
                <input
                  type="text"
                  value={catway.catwayState}
                  onChange={(e) =>
                    setCatways(prev =>
                      prev.map(c =>
                        c._id === catway._id ? { ...c, catwayState: e.target.value } : c
                      )
                    )
                  }
                />
                <button onClick={() => handleUpdate(catway._id, catway)}>Valider</button>
                <button onClick={() => setEditCatwayId(null)}>Annuler</button>
              </>
            ) : (
              <>
                {catway.catwayNumber} - {catway.catwayType} - {catway.catwayState}
                <button onClick={() => handleDelete(catway._id)}>Supprimer</button>
                <button onClick={() => setEditCatwayId(catway._id)}>Modifier</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatwayList;