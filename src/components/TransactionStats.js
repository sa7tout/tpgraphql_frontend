import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_TRANSACTION_STATS = gql`
  query GetTransactionStats {
    transactionStats {
      count
      sumDepots
      sumRetraits
    }
  }
`;

const TransactionStats = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTION_STATS);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { count, sumDepots, sumRetraits } = data.transactionStats;

  return (
    <div>
      <h3>Transaction Stats</h3>
      <p>Total Transactions: {count}</p>
      <p>Total Dépots: {sumDepots}</p>
      <p>Total Retraits: {sumRetraits}</p>
    </div>
  );
};

export default TransactionStats;
