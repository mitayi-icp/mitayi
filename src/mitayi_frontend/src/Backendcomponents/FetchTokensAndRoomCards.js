import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';
import card from '../Landmain/Assets/card.png';
import mitoken from '../Landmain/Assets/mitoken.png';
// Define the Motoko actor interface inline
const actorInterface = ({ IDL }) => {
  return IDL.Service({
    getUserTokens: IDL.Func([], [IDL.Record({ mitayi_tokens: IDL.Nat, noofroomcards: IDL.Nat })], ['query']),
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
            canisterId: 'ue7oi-fyaaa-aaaab-qadia-cai', // Replace with your actual backend canister ID
          });

          const userTokens = await actor.getUserTokens();
          // console.log(userTokens);
          setTokens(Number(userTokens.mitayi_tokens)); // Convert BigInt to number
          setRoomCards(Number(userTokens.noofroomcards)); // Convert BigInt to number
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
        <>
         <div className='flex justify-center items-center'>
         <img src={mitoken} height={17} width={17} className='pt-1'
              />
         <p className='font-bold font-sans mt-1'>M! tokens : {tokens}</p>
         
           </div>
         <div className='flex justify-center items-center'>
         <img src={card} height={18} width={18} className='pt-1 brightness-105'
              />

         <p className='font-bold font-sans mt-1'>M! Cards : {roomCards}</p>
        
           </div>
          
         
        </>
      )}
    </div>
  );
};

export default FetchTokensAndRoomCards;
