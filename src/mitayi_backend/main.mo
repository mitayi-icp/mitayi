import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Array "mo:base/Array";

actor {
    // Define a type to represent user tokens
    type UserTokens = {
        principalId: Principal;
        mitayi_tokens: Nat;
        noofroomcards: Nat; // New field for room cards
    };

    // Store user tokens using a HashMap
    let userTokens = HashMap.HashMap<Principal, UserTokens>(0, Principal.equal, Principal.hash);

    // Query to retrieve the caller's principal
    public query ({ caller }) func whoami() : async Principal {
        return caller;
    };

    // Query to fetch user tokens based on the caller's principal
    public query ({ caller }) func getUserTokens() : async UserTokens {
        switch (userTokens.get(caller)) {
            case (null) {
                // User not found, return default values (0 tokens, 0 room cards)
                return {
                    principalId = caller;
                    mitayi_tokens = 0;
                    noofroomcards = 0;
                };
            };
            case (?tokens) {
                // User found, return their tokens and room cards
                return tokens;
            };
        };
    };

    // Function to initialize user tokens if logging in for the first time
    public shared ({ caller }) func initializeUserTokens() : async () {
        // Check if user already exists
        switch (userTokens.get(caller)) {
            case (null) {
                // User does not exist, initialize with default tokens and room cards (0)
                let newUserTokens : UserTokens = {
                    principalId = caller;
                    mitayi_tokens = 0;
                    noofroomcards = 0;
                };
                userTokens.put(caller, newUserTokens);
            };
            case (?tokens) {
                // User already exists, do nothing
            };
        };
    };

    // Function to calculate the total number of registered users
    public query func getTotalRegisteredUsers() : async Nat {
        return userTokens.size();
    };

    // Function to exchange mitayi_tokens for room cards
    public shared ({ caller }) func exchangeTokensForRoomCards() : async () {
    switch (userTokens.get(caller)) {
        case (?tokens) {
            if (tokens.mitayi_tokens >= 50) {
                let updatedTokens = tokens.mitayi_tokens - 50;
                let updatedRoomCards = tokens.noofroomcards + 1;

                let updatedUserTokens: UserTokens = {
                    principalId = caller;
                    mitayi_tokens = updatedTokens;
                    noofroomcards = updatedRoomCards;
                };
                userTokens.put(caller, updatedUserTokens);
            } else {
                // Return a message indicating tokens not enough
                return;
            };
        };
        case (null) {
            // User not found, do nothing or handle error
        };
    };
};



    // Other existing functions remain unchanged
    // ...

    public query func getAllRegisteredUsers() : async [UserTokens] {
        var result: [UserTokens] = [];
        let iter = userTokens.entries();

        var next: ?(Principal, UserTokens) = iter.next();
        while (switch (next) {
            case (?(_, userToken)) {
                result := Array.append<UserTokens>(result, [userToken]);
                next := iter.next();
                true;
            };
            case (null) {
                false;
            };
        }) {};

        return result;
    };

    public shared ({ caller }) func addTokens(amount: Nat) : async () {
        switch (userTokens.get(caller)) {
            case (?tokens) {
                let updatedTokens = tokens.mitayi_tokens + amount;
                let updatedUserTokens: UserTokens = {
                    principalId = caller;
                    mitayi_tokens = updatedTokens;
                    noofroomcards = tokens.noofroomcards; // Keep room cards unchanged
                };
                userTokens.put(caller, updatedUserTokens);
            };
            case (null) {
                // User not found, do nothing or handle error
            };
        };
    };

    public shared ({ caller }) func removeTokens(amount: Nat) : async () {
        switch (userTokens.get(caller)) {
            case (?tokens) {
                if (tokens.mitayi_tokens >= amount) {
                    let updatedTokens = tokens.mitayi_tokens - amount;
                    let updatedUserTokens: UserTokens = {
                        principalId = caller;
                        mitayi_tokens = updatedTokens;
                        noofroomcards = tokens.noofroomcards; // Keep room cards unchanged
                    };
                    userTokens.put(caller, updatedUserTokens);
                } else {
                    // Handle case where user doesn't have enough tokens
                    // For simplicity, do nothing or return a message
                };
            };
            case (null) {
                // User not found, do nothing or handle error
            };
        };
    };
};
