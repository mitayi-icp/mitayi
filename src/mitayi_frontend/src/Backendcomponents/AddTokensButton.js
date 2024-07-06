import React, { useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';

// Define the Motoko actor interface inline
const actorInterface = ({ IDL }) => {
  return IDL.Service({
    addTokens: IDL.Func([IDL.Nat], [], []),
  });
};

const AddTokensButton = ({ tokensToAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const addTokens = async () => {
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
          canisterId: 'olmji-7iaaa-aaaab-qab7a-cai', // Replace with your actual backend canister ID
        });

        await actor.addTokens(tokensToAdd);
        setMessage(`Successfully added ${tokensToAdd} tokens!`);
      } else {
        setMessage('User is not authenticated. Please log in first.');
      }
    } catch (error) {
      console.error('Failed to add tokens:', error);
      setMessage('Failed to add tokens. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <button
        class="w-full py-2 px-4 bg-white font-bold text-black rounded-full text-xl border-2 border-orange-600 hover:bg-gray-300"
        onClick={addTokens}
        disabled={isLoading}
      >
        {isLoading ? 'Adding tokens...' : `Add ${tokensToAdd} Tokens`}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTokensButton;
