import React, { useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';

// Define the Motoko actor interface inline
const actorInterface = ({ IDL }) => {
  return IDL.Service({
    exchangeTokensForRoomCards: IDL.Func([], [], []),
  });
};

const ExchangeTokensButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const exchangeTokens = async () => {
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
          canisterId: 'pgce5-saaaa-aaaal-ajohq-cai', // Replace with your actual backend canister ID
        });

        await actor.exchangeTokensForRoomCards();
        setMessage(`Successfully Exchanged`);
      } else {
        setMessage('User is not authenticated. Please log in first.');
      }
    } catch (error) {
      console.error('Failed to exchange tokens:', error);
      setMessage('Failed to exchange tokens. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <>
      <button
        
        className='bg-yellow-600 px-4 mt-2 w-full py-2 font-bold mr-6 text-white rounded-full text-lg'
        onClick={exchangeTokens}
        disabled={isLoading}
      >
        {isLoading ? 'Exchanging tokens...' : 'Exchange Tokens-Room Card'}
      </button>
      {message && <p>{message}</p>}
    </>
  );
};

export default ExchangeTokensButton;
