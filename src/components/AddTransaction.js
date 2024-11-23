import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const ADD_TRANSACTION = gql`
  mutation AddTransaction($transaction: TransactionRequest!) {
    addTransaction(transaction: $transaction) {
      id
      montant
      type
    }
  }
`;

const AddTransaction = ({ compteId }) => {
  const [montant, setMontant] = useState(0);
  const [type, setType] = useState("DEPOT");
  const [date, setDate] = useState("");

  const [addTransaction, { data, loading, error }] = useMutation(ADD_TRANSACTION);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      variables: {
        transaction: {
          compteId: parseInt(compteId, 10),
          montant: parseFloat(montant),
          date: date,
          type: type,
        },
      },
    });
  };

  return (
    <div>
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Montant:</label>
          <input
            type="number"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="DEPOT">Dépot</option>
            <option value="RETRAIT">Retrait</option>
          </select>
        </div>
        <button type="submit">Add Transaction</button>
      </form>
      {loading && <p>Adding transaction...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Transaction added successfully!</p>}
    </div>
  );
};

export default AddTransaction;
