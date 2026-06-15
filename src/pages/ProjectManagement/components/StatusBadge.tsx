import type { ProjectStatus } from "../../../data/projects";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Active: "bg-gray-100 text-success",
  "On Hold": "bg-gray-100 text-warning",
  Completed: "bg-gray-100 text-primary",
  Archived: "bg-gray-100 text-gray-600",
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-sm py-xs text-sm font-medium ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
