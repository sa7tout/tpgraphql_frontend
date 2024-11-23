import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";

const AccountsList = ({ onSelectAccount }) => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);

  if (loading) return <p>Loading accounts...</p>;
  if (error) return <p>Error loading accounts: {error.message}</p>;

  return (
    <div>
      {data.allComptes.map((compte) => (
        <div key={compte.id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
          <p><strong>Type:</strong> {compte.type}</p>
          <p><strong>Solde:</strong> {compte.solde}</p>
          <p><strong>Date Creation:</strong> {compte.dateCreation}</p>
          <button onClick={() => onSelectAccount(compte.id)}>View Details</button>
        </div>
      ))}
    </div>
  );
};

export default AccountsList;
