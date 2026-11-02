import { auth } from "./firebase";
import type { DashboardRole, UserProfile } from "@/types/dashboard";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

/**
 * Helper to obtain the active Firebase ID token for authentication
 */
export async function getFirebaseIdToken(): Promise<string | null> {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  try {
    return await currentUser.getIdToken();
  } catch (err) {
    console.warn("Failed to get Firebase ID token:", err);
    return null;
  }
}

export interface AssignRolePayload {
  role: DashboardRole;
  email?: string | null;
  displayName?: string | null;
  institution?: string;
  companyName?: string;
  headline?: string;
  targetRole?: string;
  department?: string;
  batchYear?: string;
}

/**
 * Fetch user profile and assigned dashboard from the CheckTalent NestJS Backend (backed by Supabase)
 */
export async function fetchUserProfileFromBackend(
  token: string
): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      console.warn(`Backend responded with status ${res.status} for profile`);
      return null;
    }

    const data = await res.json();
    return {
      uid: data.uid,
      email: data.email ?? null,
      displayName: data.displayName ?? null,
      photoURL: data.photoURL ?? null,
      role: data.role ?? null,
      institution: data.institution,
      companyName: data.companyName,
      headline: data.headline,
      targetRole: data.targetRole,
      department: data.department,
      batchYear: data.batchYear,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.warn("Failed to reach CheckTalent backend API:", error);
    return null;
  }
}

/**
 * Assign user dashboard role permanently on the backend & Supabase
 */
export async function assignUserRoleOnBackend(
  token: string,
  payload: AssignRolePayload
): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/users/assign-role`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 409) {
      // Role already assigned and permanently locked
      console.warn("Role is permanently locked on backend. Fetching existing profile.");
      return await fetchUserProfileFromBackend(token);
    }

    if (!res.ok) {
      const errBody = await res.text();
      console.warn(`Backend assign-role error (${res.status}):`, errBody);
      return null;
    }

    const data = await res.json();
    return {
      uid: data.uid,
      email: data.email ?? null,
      displayName: data.displayName ?? null,
      photoURL: data.photoURL ?? null,
      role: data.role,
      institution: data.institution,
      companyName: data.companyName,
      headline: data.headline,
      targetRole: data.targetRole,
      department: data.department,
      batchYear: data.batchYear,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.warn("Backend assign-role request failed:", error);
    return null;
  }
}

/**
 * Fetch personalized dashboard data for the active user
 */
export async function fetchDashboardDataFromBackend(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (err) {
    console.warn("Failed to load dashboard data from backend:", err);
    return null;
  }
}

/**
 * Check backend health & Supabase connection
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
