import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

// Define the Motoko actor interface inline
const actorInterface = ({ IDL }) => {
  return IDL.Service({
    whoami: IDL.Func([], [IDL.Principal], ['query']),
    getUserTokens: IDL.Func([], [IDL.Nat], ['query']),
    initializeUserTokens: IDL.Func([], [], []),
  });
};

const Login = ({ onLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const [userTokens, setUserTokens] = useState(null); // Use null to signify tokens are not yet fetched

  useEffect(() => {
    const savedPrincipal = localStorage.getItem('principal');
    if (savedPrincipal) {
      setIsLoggedIn(true);
      setLoginStatus(`Logged in as: ${savedPrincipal}`);
      fetchUserTokens(savedPrincipal);
    }
  }, []);

  const fetchUserTokens = async (principal) => {
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

        try {
          const tokens = await actor.getUserTokens();
          setUserTokens(tokens); // Update userTokens state with fetched tokens
        } catch (error) {
          console.error('Error calling getUserTokens:', error);
          setLoginStatus('Failed to retrieve data');
        }
      } else {
        setIsLoggedIn(false); // Ensure user is not considered logged in if not authenticated
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus('Login failed');
    }
  };

  const handleLogin = async () => {
    try {
      const authClient = await AuthClient.create();
      const iiUrl = 'https://identity.ic0.app'; // Use a hardcoded URL for Internet Identity

      await authClient.login({
        identityProvider: iiUrl,
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const agent = new HttpAgent({ identity });
          const actor = Actor.createActor(actorInterface, {
            agent,
            canisterId: 'olmji-7iaaa-aaaab-qab7a-cai', // Replace with your actual backend canister ID
          });

          try {
            const principal = await actor.whoami();
            if (principal && typeof principal.toText === 'function') {
              setIsLoggedIn(true);
              const principalText = principal.toText();
              setLoginStatus(`Logged in as: ${principalText}`);
              localStorage.setItem('principal', principalText); // Save principal to localStorage
              onLogin();
              // Fetch user tokens after successful login
              fetchUserTokens(principalText);

              // Initialize user tokens if logging in for the first time
              await actor.initializeUserTokens();
            } else {
              throw new Error('Invalid principal returned');
            }
          } catch (error) {
            console.error('Error calling whoami or getUserTokens:', error);
            setLoginStatus('Failed to retrieve data');
          }
        },
        onError: (err) => {
          console.error('Internet Identity login error:', err);
          setLoginStatus('Login failed');
        },
      });
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus('Login failed');
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <p>{loginStatus}</p>
          {userTokens !== null && <p>Tokens: {userTokens}</p>} {/* Render tokens only if fetched */}
        </>
      ) : (
        <button class="w-full py-2 px-4 bg-white font-bold text-black rounded-full text-xl border-2 border-orange-600 hover:bg-gray-300 " onClick={handleLogin}><span className='gradient-text'>Login with Internet Identity</span></button>
      )}
    </div>
  );
};

export default Login;
