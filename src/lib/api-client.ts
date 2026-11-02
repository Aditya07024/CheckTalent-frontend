import { auth } from "./firebase";
import type { DashboardRole, UserProfile } from "@/types/dashboard";

export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    // If the browser visits via IP or non-localhost, match the host on backend port 4000
    if (hostname && hostname !== "localhost") {
      return `${protocol}//${hostname}:4000/api`;
    }
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
}

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
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/users/profile`, {
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
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/users/assign-role`, {
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
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/dashboard`, {
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
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/health`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ==============================================================================
// CANDIDATE REPOSITORIES API
// ==============================================================================

export async function fetchCandidateRepos(token: string) {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/repos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn("fetchCandidateRepos error:", err);
    return [];
  }
}

export async function addCandidateRepo(token: string, repo: Record<string, unknown>) {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/repos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(repo),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("addCandidateRepo error:", err);
    return null;
  }
}

export async function deleteCandidateRepo(token: string, id: string) {
  try {
    const baseUrl = getApiBaseUrl();
    await fetch(`${baseUrl}/repos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.warn("deleteCandidateRepo error:", err);
  }
}

// ==============================================================================
// JOBS API
// ==============================================================================

export async function fetchJobs(token?: string, recruiterUid?: string) {
  try {
    const baseUrl = getApiBaseUrl();
    const url = new URL(`${baseUrl}/jobs`);
    if (recruiterUid) url.searchParams.set("recruiterUid", recruiterUid);
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(url.toString(), { headers });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn("fetchJobs error:", err);
    return [];
  }
}

export async function createJobPosting(token: string, job: Record<string, unknown>) {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("createJobPosting error:", err);
    return null;
  }
}

// ==============================================================================
// DRIVES API
// ==============================================================================

export async function fetchCampusDrives(token?: string, tpoUid?: string) {
  try {
    const baseUrl = getApiBaseUrl();
    const url = new URL(`${baseUrl}/drives`);
    if (tpoUid) url.searchParams.set("tpoUid", tpoUid);
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(url.toString(), { headers });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn("fetchCampusDrives error:", err);
    return [];
  }
}

export async function scheduleCampusDrive(token: string, drive: Record<string, unknown>) {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/drives`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(drive),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("scheduleCampusDrive error:", err);
    return null;
  }
}

// ==============================================================================
// APPLICATIONS API
// ==============================================================================

export async function fetchApplications(token: string) {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/applications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn("fetchApplications error:", err);
    return [];
  }
}

export async function submitApplication(token: string, app: Record<string, unknown>) {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/applications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(app),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("submitApplication error:", err);
    return null;
  }
}

// ==============================================================================
// CAMPUS ROSTER API
// ==============================================================================

export async function fetchCampusStudents(token: string) {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/campus/students`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn("fetchCampusStudents error:", err);
    return [];
  }
}

export async function addCampusStudent(token: string, student: Record<string, unknown>) {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/campus/students`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("addCampusStudent error:", err);
    return null;
  }
}

// ==============================================================================
// RECRUITER TALENT & INTERVIEWS API
// ==============================================================================

export async function fetchVerifiedCandidates(token: string) {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/candidates`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn("fetchVerifiedCandidates error:", err);
    return [];
  }
}

export async function fetchInterviews(token: string) {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/interviews`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn("fetchInterviews error:", err);
    return [];
  }
}

export async function scheduleInterview(token: string, interview: Record<string, unknown>) {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/interviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interview),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("scheduleInterview error:", err);
    return null;
  }
}
