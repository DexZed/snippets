import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";

import React, { createContext, useContext } from "react";

import api from "../services/api";
import app from "../auth/firebase";
import { computed, effect, signal } from "@preact/signals-react";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextValue = {
  currentUser: typeof currentUser; // Signal for current user
  loading: typeof loading; // Signal for loading state
  uid: typeof uid; // Computed signal for UID
  token: typeof token; // Computed signal for token
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  updateDetails: ({
    displayName,
    photoURL,
  }: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
  userDetails: () => {
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  } | null;
  signUpAndUpdate: (
    email: string,
    password: string,
    details: { displayName?: string; photoURL?: string }
  ) => Promise<void>;
  googleAuth: () => Promise<UserCredential>;
  getAuthToken: () => Promise<string | null>;
};

const currentUser = signal<User | null>(null);
const loading = signal(true);
const uid = computed(() => {
  if (!currentUser.value) {
    throw new Error("No user is logged in");
  }
  return currentUser.value.uid;
});

const token = computed(async () => {
  if (!currentUser.value) {
    throw new Error("No user is logged in");
  }
  return await currentUser.value.getIdToken();
});
const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
 
  async function googleAuth() {
    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in failed:", error);
      throw error;
    }
  }

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  function updateDetails({
    displayName,
    photoURL,
  }: {
    displayName?: string;
    photoURL?: string;
  }) {
    const user = ensureUser();
    return updateProfile(user, { displayName, photoURL });
  }

  async function signUpAndUpdate(
    email: string,
    password: string,
    details: { displayName?: string; photoURL?: string }
  ) {
    return signUp(email, password).then(() => {
      if (auth.currentUser) {
        return updateDetails(details);
      }
      throw new Error("User creation failed");
    });
  }

  function userDetails(): {
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  } | null {
    const user = auth.currentUser;
    if (!user) return null;
    const { displayName, email, photoURL } = user;
    return { displayName, email, photoURL };
  }

  async function getAuthToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    } else {
      console.error("No user is signed in.");
      return null;
    }
  }

  function ensureUser() {
    if (!auth.currentUser) throw new Error("No user is logged in");
    return auth.currentUser;
  }

  effect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          await api.post(
            `/postSessions`,
            {},
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );
        } catch (error) {
          console.error("Error sending token to backend:", error);
        }
      } else {
        try {
          await api.delete(`/delSessions`);
        } catch (error) {
          console.error("Error clearing session on logout:", error);
        }
      }

      // Update signals
      currentUser.value = user || null;
      loading.value = false;
    });

    // Cleanup logic
    return () => unsubscribe();
  });
  effect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/getSessions");
        if (res.status === 200) {
          console.log("Session is valid:", res.data);
        } else {
          console.log("No session detected");
        }
      } catch (error) {
        console.error("Session check failed:", error);
      }
    };

    checkSession();
  });

  const contextValue: AuthContextValue = {
    currentUser, // Signal<User | null>
    loading, // Signal<boolean>
    uid, // Computed signal for UID
    token, // Computed signal for token
    signUp,
    signIn,
    signOut,
    updateDetails,
    userDetails,
    signUpAndUpdate,
    googleAuth,
    getAuthToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading.value && children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
}
