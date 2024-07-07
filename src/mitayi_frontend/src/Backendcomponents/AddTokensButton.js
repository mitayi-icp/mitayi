import React, { useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';
import { useNavigate } from 'react-router-dom';
// Define the Motoko actor interface inline
const actorInterface = ({ IDL }) => {
  return IDL.Service({
    addTokens: IDL.Func([IDL.Nat], [], []),
  });
};

const AddTokensButton = ({ tokensToAdd }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
const navigateto = useNavigate();
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
          canisterId: 'ue7oi-fyaaa-aaaab-qadia-cai', // Replace with your actual backend canister ID
        });

        await actor.addTokens(tokensToAdd);
        setMessage(`Successfully added ${tokensToAdd} tokens!`);
        navigateto('/');
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
        className="text-white bg-yellow-500 hover:bg-yellow-800 text-yellow-800 hover:text-white font-medium rounded-full text-sm inline-flex items-center px-5 py-2.5 text-center mb-2"
        onClick={addTokens}
        disabled={isLoading}
      >
        {isLoading ? 'Adding tokens...' : `Claim ${tokensToAdd} Tokens`}
      </button>
      {message && <p className='text-md font-bold'>{message}</p>}
    </div>
  );
};

export default AddTokensButton;
