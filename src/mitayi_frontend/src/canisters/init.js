// src/canisters/init.js

import { createActor } from '@dfinity/agent';
import { idlFactory as init_idl, canisterId as init_id } from 'dfx-generated/init';

// Initialize the actor with the HTTP agent and canister ID
const init = {
  agent: undefined, // Initialize the agent later
  actor: undefined, // Initialize the actor later
};

// Function to initialize the HTTP agent
init.setup = (agent) => {
  init.agent = agent;
  init.actor = createActor(init_idl, {
    agent,
    canisterId: init_id,
  });
};

// Export the initialized init object
export default init;
