export type ProjectStatus = "Active" | "On Hold" | "Completed" | "Archived";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  owner: string;
  createdAt: string;
  dueDate: string;
  [key: string]: unknown;
}

export const PROJECT_STATUSES: ProjectStatus[] = [
  "Active",
  "On Hold",
  "Completed",
  "Archived",
];

const MOCK_PROJECTS: Project[] = [
  { id: "p-001", name: "Apollo CRM Revamp", description: "Rebuild the CRM dashboard with the new design system.", status: "Active", owner: "Aarav Shah", createdAt: "2026-01-12", dueDate: "2026-07-30" },
  { id: "p-002", name: "Billing Service Migration", description: "Move billing from monolith to a dedicated service.", status: "Active", owner: "Meera Iyer", createdAt: "2026-02-03", dueDate: "2026-08-15" },
  { id: "p-003", name: "Mobile App v3", description: "Next major release of the customer mobile app.", status: "On Hold", owner: "Rohan Patel", createdAt: "2025-11-20", dueDate: "2026-09-01" },
  { id: "p-004", name: "Design Token Pipeline", description: "Automate token sync from Figma to code.", status: "Completed", owner: "Sana Kapoor", createdAt: "2025-09-08", dueDate: "2026-01-31" },
  { id: "p-005", name: "Customer Portal SSO", description: "Single sign-on across all customer-facing apps.", status: "Active", owner: "Aarav Shah", createdAt: "2026-03-14", dueDate: "2026-10-12" },
  { id: "p-006", name: "Data Warehouse Refresh", description: "Migrate reporting to the new warehouse cluster.", status: "On Hold", owner: "Vikram Rao", createdAt: "2026-01-29", dueDate: "2026-11-05" },
  { id: "p-007", name: "Onboarding Flow A/B", description: "Experiment with a shorter onboarding funnel.", status: "Completed", owner: "Meera Iyer", createdAt: "2025-12-01", dueDate: "2026-03-20" },
  { id: "p-008", name: "Accessibility Audit 2026", description: "WCAG 2.2 AA audit across web properties.", status: "Active", owner: "Sana Kapoor", createdAt: "2026-04-02", dueDate: "2026-12-18" },
  { id: "p-009", name: "Search Relevance Tuning", description: "Improve search ranking with behavioral signals.", status: "Archived", owner: "Vikram Rao", createdAt: "2025-08-17", dueDate: "2025-12-31" },
  { id: "p-010", name: "Partner API v2", description: "Versioned public API with rate limiting.", status: "Active", owner: "Rohan Patel", createdAt: "2026-02-21", dueDate: "2026-09-30" },
  { id: "p-011", name: "Notifications Center", description: "Unified in-app and email notification preferences.", status: "On Hold", owner: "Aarav Shah", createdAt: "2026-05-06", dueDate: "2026-10-25" },
  { id: "p-012", name: "Infra Cost Optimization", description: "Reduce cloud spend by 25% through rightsizing.", status: "Completed", owner: "Meera Iyer", createdAt: "2025-10-11", dueDate: "2026-02-28" },
];

/** Mock API — resolves after a short delay so the loading state is visible. */
export function fetchProjects(): Promise<Project[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...MOCK_PROJECTS]), 900);
  });
}
