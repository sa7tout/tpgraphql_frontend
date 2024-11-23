import React, { useState } from "react";
import AccountsList from "./components/AccountsList";
import CompteDetails from "./components/compteDetails";
import AddCompte from "./components/AddCompte";

const App = () => {
  const [selectedCompteId, setSelectedCompteId] = useState(null);

  const handleSelectAccount = (compteId) => {
    setSelectedCompteId(compteId);
  };

  return (
    <div>
      <h1>GraphQL Accounts Management</h1>
      <AddCompte />
      <h2>All Accounts</h2>
      <AccountsList onSelectAccount={handleSelectAccount} />
      {selectedCompteId && (
        <div>
          <h2>Selected Account Details</h2>
          <CompteDetails compteId={selectedCompteId} />
        </div>
      )}
    </div>
  );
};

export default App;
