import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_TRANSACTIONS = gql`
  query GetCompteTransactions($id: ID!) {
    compteTransactions(id: $id) {
      id
      montant
      date
      type
    }
  }
`;

const TransactionList = ({ compteId }) => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    variables: { id: compteId },
  });

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>Transactions</h3>
      <ul>
        {data.compteTransactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type} - {transaction.montant} on {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
