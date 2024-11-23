import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMPTE } from '../graphql/mutations';

const AddCompte = () => {
  const [formData, setFormData] = useState({
    solde: 0,
    dateCreation: '',
    type: 'COURANT',
  });

  const [createCompte] = useMutation(CREATE_COMPTE);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCompte({ variables: { compte: formData } });
    alert('Compte created successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Compte</h2>
      <input
        type="number"
        name="solde"
        placeholder="Solde"
        value={formData.solde}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dateCreation"
        value={formData.dateCreation}
        onChange={handleChange}
      />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="COURANT">Courant</option>
        <option value="EPARGNE">Epargne</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
};

export default AddCompte;
