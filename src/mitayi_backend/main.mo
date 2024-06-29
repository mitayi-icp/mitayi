import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

actor {
    // Define a type to represent user tokens
    type UserTokens = {
        principalId: Principal;
        mitayi_tokens: Nat;
    };

    // Store user tokens using a HashMap
    let userTokens = HashMap.HashMap<Principal, UserTokens>(0, Principal.equal, Principal.hash);

    // Query to retrieve the caller's principal
    public query ({ caller }) func whoami() : async Principal {
        return caller;
    };

    // Query to fetch user tokens based on the caller's principal
    public query ({ caller }) func getUserTokens() : async Nat {
        switch (userTokens.get(caller)) {
            case (null) {
                // User not found, return default value (0 tokens)
                return 0;
            };
            case (?tokens) {
                // User found, return their tokens
                return tokens.mitayi_tokens;
            };
        };
    };

    // Function to initialize user tokens if logging in for the first time
    public shared ({ caller }) func initializeUserTokens() : async () {
        // Check if user already exists
        switch (userTokens.get(caller)) {
            case (null) {
                // User does not exist, initialize with default tokens (0)
                let newUserTokens : UserTokens = {
                    principalId = caller;
                    mitayi_tokens = 0;
                };
                userTokens.put(caller, newUserTokens);
            };
            case (?tokens) {
                // User already exists, do nothing
            };
        };
    };
};
