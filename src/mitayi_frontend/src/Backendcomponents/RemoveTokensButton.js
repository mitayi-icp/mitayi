import React, { useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';

// Define the Motoko actor interface inline
const actorInterface = ({ IDL }) => {
  return IDL.Service({
    removeTokens: IDL.Func([IDL.Nat], [], []),
  });
};

const RemoveTokensButton = ({ tokensToRemove }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const removeTokens = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const authClient = await AuthClient.create();
      const iiUrl = 'https://identity.ic0.app'; // Use a hardcoded URL for Internet Identity

      if (authClient.isAuthenticated()) {
        const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });
        const actor = Actor.createActor(actorInterface, {
          agent,
          canisterId: 'ue7oi-fyaaa-aaaab-qadia-cai', // Replace with your actual backend canister ID
        });

        await actor.removeTokens(tokensToRemove);
        setMessage(`Successfully removed ${tokensToRemove} tokens!`);
      } else {
        setMessage('User is not authenticated. Please log in first.');
      }
    } catch (error) {
      console.error('Failed to remove tokens:', error);
      setMessage('Failed to remove tokens. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <button
        className="w-full py-2 px-4 bg-white font-bold text-black rounded-full text-xl border-2 border-orange-600 hover:bg-gray-300"
        onClick={removeTokens}
        disabled={isLoading}
      >
        {isLoading ? 'Removing tokens...' : `Remove ${tokensToRemove} Tokens`}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RemoveTokensButton;
