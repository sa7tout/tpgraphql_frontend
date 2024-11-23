import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COMPTE_DETAILS } from "../graphql/queries";
import { ADD_TRANSACTION } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const CompteDetails = ({ compteId }) => {
  const { loading, error, data, refetch } = useQuery(GET_COMPTE_DETAILS, {
    variables: { compteId },
  });

  const [addTransaction] = useMutation(ADD_TRANSACTION);
  const [formData, setFormData] = useState({
    montant: "",
    date: "",
    type: "DEPOT",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const compte = data.compteById;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction({
        variables: {
          transaction: {
            compteId,
            montant: parseFloat(formData.montant),
            date: formData.date,
            type: formData.type,
          },
        },
      });
      setFormData({ montant: "", date: "", type: "DEPOT" }); // Reset form
      refetch(); // Refresh transactions
    } catch (err) {
      console.error("Error adding transaction:", err.message);
    }
  };

  return (
    <div>
      <h2>Compte Details</h2>
      <p><strong>ID:</strong> {compte.id}</p>
      <p><strong>Type:</strong> {compte.type}</p>
      <p><strong>Solde:</strong> {compte.solde}</p>
      <p><strong>Date Creation:</strong> {compte.dateCreation}</p>

      <h3>Add Transaction</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="montant">Montant:</label>
          <input
            type="number"
            name="montant"
            value={formData.montant}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="DEPOT">DEPOT</option>
            <option value="RETRAIT">RETRAIT</option>
          </select>
        </div>
        <button type="submit">Add Transaction</button>
      </form>

      <h3>Transactions:</h3>
      {compte.transactions.length > 0 ? (
        <ul>
          {compte.transactions.map((tx) => (
            <li key={tx.id}>
              <p><strong>Type:</strong> {tx.type}</p>
              <p><strong>Montant:</strong> {tx.montant}</p>
              <p><strong>Date:</strong> {tx.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions available for this account.</p>
      )}
    </div>
  );
};

export default CompteDetails;
