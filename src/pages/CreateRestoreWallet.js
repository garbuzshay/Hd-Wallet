// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import WalletForm from '../components/WalletForm';

// const CreateRestoreWallet = () => {
//   const [seedPhrase, setSeedPhrase] = useState('');
//   const [currency, setCurrency] = useState('Ethereum');
//   const navigate = useNavigate();

//   const createWallet = () => {
//     console.log(`Creating new ${currency} wallet`);
//     navigate('/dashboard');
//   };

//   const restoreWallet = () => {
//     console.log(`Restoring ${currency} wallet with seed phrase:`, seedPhrase);
//     navigate('/dashboard');
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
//         Create or Recover Wallet
//       </h2>
//       <WalletForm
//         seedPhrase={seedPhrase}
//         setSeedPhrase={setSeedPhrase}
//         onCreateWallet={createWallet}
//         onRestoreWallet={restoreWallet}
//         currency={currency}
//         setCurrency={setCurrency}
//       />
//     </div>
//   );
// };

// export default CreateRestoreWallet;


// import React, { useState } from "react";
// import { useWallet } from "../contexts/WalletContext";
// import WalletForm from "../components/WalletForm";

// const CreateRestoreWallet = () => {
//   const [seedPhrase, setSeedPhrase] = useState("");
//   const [currency, setCurrency] = useState("Ethereum");
//   const { createWallet, restoreWallet } = useWallet();

//   return (
//     <div className="max-w-md mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
//         Create or Recover Wallet
//       </h2>
//       <WalletForm
//         seedPhrase={seedPhrase}
//         setSeedPhrase={setSeedPhrase}
//         onCreateWallet={() => createWallet(currency)}
//         onRestoreWallet={() => restoreWallet(seedPhrase)}
//         currency={currency}
//         setCurrency={setCurrency}
//       />
//     </div>
//   );
// };

// export default CreateRestoreWallet;
import React, { useState } from "react";
import { useWallet } from "../contexts/WalletContext";
import { useNavigate } from "react-router-dom";
import WalletForm from "../components/WalletForm";

const CreateRestoreWallet = () => {
  const { createWallet, restoreWallet } = useWallet();
  const [mnemonic, setMnemonic] = useState(null);
  const navigate = useNavigate();
  console.log("create")
  const handleCreateWallet = async (name, password) => {
    if (!name || !password) {
      alert("Please provide a name and password for the wallet.");
      return;
    }
    try {
      const newMnemonic = await createWallet(name, password);
      setMnemonic(newMnemonic);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  const handleRestoreWallet = (seedPhrase) => {
    if (!seedPhrase) {
      alert("Please provide a seed phrase to restore the wallet.");
      return;
    }
    restoreWallet(seedPhrase);
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
        Create or Recover Wallet
      </h2>
      <WalletForm
        onCreateWallet={handleCreateWallet}
        onRestoreWallet={handleRestoreWallet}
      />
      {mnemonic && (
        <div className="mt-4 bg-gray-800 rounded-lg p-6 mb-6 border border-purple-500 shadow-neon-purple ">
          <h3 className="font-bold">Your Wallet Mnemonic</h3>
          <p className="break-words mt-2">{mnemonic}</p>
          <button 
            onClick={handleGoToDashboard} 
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRestoreWallet;

