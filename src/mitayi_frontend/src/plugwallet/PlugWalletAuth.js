import React, { useState } from 'react';

const PlugWalletAuth = () => {
  const [principal, setPrincipal] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onClick = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Check if Plug wallet is available
      if (!window.ic || !window.ic.plug) {
        throw new Error('Plug wallet is not installed');
      }

      console.log('Available Plug methods:', Object.keys(window.ic.plug));

      // Request connection
      const connected = await window.ic.plug.requestConnect();
      if (!connected) {
        throw new Error('Connection to Plug wallet failed');
      }

      // Create agent and get identity
      await window.ic.plug.createAgent();
      const principal = await window.ic.plug.agent.getPrincipal();

      setPrincipal(principal.toText());

      // Fetch wallet balance
      const balanceResult = await window.ic.plug.requestBalance();
      console.log('Balance Result:', balanceResult);
      const icpBalance = balanceResult.find(balance => balance.name === 'ICP');

      setBalance(icpBalance ? icpBalance.amount : '0');

      setError('');
    } catch (error) {
      console.error('Failed to connect to Plug wallet:', error);
      setError('Failed to connect to Plug wallet. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <button
        className="w-full py-2 px-4 bg-white font-bold text-black rounded-full text-xl border-2 border-orange-600 hover:bg-gray-300"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? 'Connecting to Plug Wallet...' : 'Connect to Plug Wallet'}
      </button>
      {error && <p>{error}</p>}
      {principal && (
        <div>
          <p>Connected as: {principal}</p>
          <p>ICP Balance: {balance}</p>
        </div>
      )}
    </div>
  );
};

export default PlugWalletAuth;
