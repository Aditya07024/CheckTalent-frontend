import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { DashboardRole, UserProfile } from "@/types/dashboard";
import {
  fetchUserProfileFromBackend,
  assignUserRoleOnBackend,
  getFirebaseIdToken,
} from "./api-client";

const ROLE_STORAGE_KEY_PREFIX = "checktalent_role_";
const PROFILE_STORAGE_KEY_PREFIX = "checktalent_profile_";

/**
 * Get user profile and assigned dashboard role.
 * Queries Backend API (Supabase) -> Firestore -> localStorage with multi-tier fallback.
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!uid) return null;

  // 1. Try Backend API (Supabase PostgreSQL)
  try {
    const token = await getFirebaseIdToken();
    if (token) {
      const backendProfile = await fetchUserProfileFromBackend(token);
      if (backendProfile?.role) {
        // Sync local cache
        if (typeof window !== "undefined") {
          localStorage.setItem(`${ROLE_STORAGE_KEY_PREFIX}${uid}`, backendProfile.role);
          localStorage.setItem(
            `${PROFILE_STORAGE_KEY_PREFIX}${uid}`,
            JSON.stringify(backendProfile)
          );
        }
        return backendProfile;
      }
    }
  } catch (error) {
    console.warn("Backend API read skipped, checking Firestore:", error);
  }

  // 2. Fallback to Firestore
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data() as UserProfile;
      // Sync local cache
      if (typeof window !== "undefined") {
        if (data.role) {
          localStorage.setItem(`${ROLE_STORAGE_KEY_PREFIX}${uid}`, data.role);
        }
        localStorage.setItem(
          `${PROFILE_STORAGE_KEY_PREFIX}${uid}`,
          JSON.stringify(data)
        );
      }
      return data;
    }
  } catch (error) {
    console.warn("Firestore read failed, falling back to local storage:", error);
  }

  // 3. Fallback to localStorage
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(`${PROFILE_STORAGE_KEY_PREFIX}${uid}`);
      if (cached) {
        return JSON.parse(cached) as UserProfile;
      }
      const cachedRole = localStorage.getItem(
        `${ROLE_STORAGE_KEY_PREFIX}${uid}`
      ) as DashboardRole | null;
      if (cachedRole) {
        return {
          uid,
          email: null,
          displayName: null,
          role: cachedRole,
        };
      }
    } catch (e) {
      console.warn("Local storage read error:", e);
    }
  }

  return null;
}

/**
 * Assigns user dashboard role once upon onboarding.
 * Once assigned, the dashboard is permanently locked to that account ID and cannot be switched.
 * Synchronizes with Supabase database (via backend) and Firebase Firestore.
 */
export async function assignUserRole(
  uid: string,
  role: DashboardRole,
  details: {
    email?: string | null;
    displayName?: string | null;
    institution?: string;
    companyName?: string;
    headline?: string;
    targetRole?: string;
    department?: string;
    batchYear?: string;
  } = {}
): Promise<UserProfile> {
  // Enforce permanent assignment: if user already has an assigned dashboard, cannot re-assign or switch
  const existing = await getUserProfile(uid);
  if (existing?.role) {
    console.warn(
      `Dashboard role is permanently locked to role '${existing.role}' for account ${uid}. Switching is not permitted.`
    );
    return existing;
  }

  const now = new Date().toISOString();

  const profile: UserProfile = {
    uid,
    role,
    email: details.email ?? null,
    displayName: details.displayName ?? null,
    institution: details.institution?.trim() || undefined,
    companyName: details.companyName?.trim() || undefined,
    headline: details.headline?.trim() || undefined,
    targetRole: details.targetRole?.trim() || undefined,
    department: details.department?.trim() || undefined,
    batchYear: details.batchYear?.trim() || undefined,
    updatedAt: now,
  };

  // 1. Save locally immediately for fast responsive UI
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`${ROLE_STORAGE_KEY_PREFIX}${uid}`, role);
      localStorage.setItem(
        `${PROFILE_STORAGE_KEY_PREFIX}${uid}`,
        JSON.stringify(profile)
      );
    } catch (e) {
      console.warn("Failed to write to localStorage:", e);
    }
  }

  // 2. Synchronize with Backend API (Supabase PostgreSQL)
  try {
    const token = await getFirebaseIdToken();
    if (token) {
      const backendSaved = await assignUserRoleOnBackend(token, {
        role,
        ...details,
      });
      if (backendSaved) {
        return backendSaved;
      }
    }
  } catch (err) {
    console.warn("Backend Supabase role assignment sync error:", err);
  }

  // 3. Synchronize with Firestore
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(
      userRef,
      {
        uid,
        role,
        ...details,
        updatedAt: now,
      },
      { merge: true }
    );
  } catch (error) {
    console.warn("Firestore sync failed, role cached locally:", error);
  }

  return profile;
}
