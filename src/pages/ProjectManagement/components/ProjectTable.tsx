import { Card, DataTable, type Column, type SortState } from "../../../components/ui";
import type { Project } from "../../../data/projects";
import StatusBadge from "./StatusBadge";

interface ProjectTableProps {
  projects: Project[];
  sort: SortState;
  onSortChange: (sort: SortState) => void;
}

const COLUMNS: Column<Project>[] = [
  {
    key: "name",
    header: "Project",
    sortable: true,
    render: (project) => (
      <div>
        <p className="font-medium text-secondary">{project.name}</p>
        <p className="text-sm text-gray-600">{project.description}</p>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (project) => <StatusBadge status={project.status} />,
  },
  { key: "owner", header: "Owner", sortable: true },
  { key: "createdAt", header: "Created", sortable: true },
  { key: "dueDate", header: "Due", sortable: true },
];

export default function ProjectTable({
  projects,
  sort,
  onSortChange,
}: ProjectTableProps) {
  return (
    <Card elevation="sm" padding="sm" className="overflow-x-auto">
      <DataTable
        columns={COLUMNS}
        rows={projects}
        density="comfortable"
        sort={sort}
        onSortChange={onSortChange}
        caption="Projects"
        pagination
        pageSize={5}
      />
    </Card>
  );
}
