import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';

// Define the Motoko actor interface inline
const actorInterface = ({ IDL }) => {
  return IDL.Service({
    getUserTokens: IDL.Func([], [{ mitayi_tokens: IDL.Nat, noofroomcards: IDL.Nat }], ['caller']),
  });
};

const FetchTokensAndRoomCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [roomCards, setRoomCards] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');

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

          const userTokens = await actor.getUserTokens();
          setTokens(userTokens.mitayi_tokens.toNumber()); // Convert Nat to number if necessary
          setRoomCards(userTokens.noofroomcards.toNumber()); // Convert Nat to number if necessary
        } else {
          setError('User is not authenticated. Please log in first.');
        }
      } catch (error) {
        console.error('Failed to fetch tokens and room cards:', error);
        setError('Failed to fetch tokens and room cards. Please try again.');
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading tokens and room cards...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <div>
          <p>Tokens: {tokens}</p>
          <p>Room Cards: {roomCards}</p>
        </div>
      )}
    </div>
  );
};

export default FetchTokensAndRoomCards;
