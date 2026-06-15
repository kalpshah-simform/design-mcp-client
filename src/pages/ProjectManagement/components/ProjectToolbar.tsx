import { Button, Input } from "../../../components/ui";
import { PROJECT_STATUSES } from "../../../data/projects";

export interface ProjectFiltersState {
  search: string;
  status: string;
  owner: string;
}

interface ProjectToolbarProps {
  filters: ProjectFiltersState;
  owners: string[];
  onFiltersChange: (filters: ProjectFiltersState) => void;
  onCreateClick: () => void;
}

const selectClassName =
  "min-h-touch rounded-md border border-gray-600 bg-surface px-md text-md text-secondary focus:border-primary focus:outline focus:outline-2 focus:outline-primary";

export default function ProjectToolbar({
  filters,
  owners,
  onFiltersChange,
  onCreateClick,
}: ProjectToolbarProps) {
  const hasActiveFilters =
    filters.search !== "" || filters.status !== "" || filters.owner !== "";

  return (
    <div className="flex flex-col gap-md md:flex-row md:items-center">
      <div className="flex-1">
        <Input
          type="search"
          size="md"
          placeholder="Search projects by name or description…"
          aria-label="Search projects"
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />
      </div>

      <select
        aria-label="Filter by status"
        className={selectClassName}
        value={filters.status}
        onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
      >
        <option value="">All statuses</option>
        {PROJECT_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select
        aria-label="Filter by owner"
        className={selectClassName}
        value={filters.owner}
        onChange={(e) => onFiltersChange({ ...filters, owner: e.target.value })}
      >
        <option value="">All owners</option>
        {owners.map((owner) => (
          <option key={owner} value={owner}>
            {owner}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <Button
          variant="secondary"
          size="md"
          aria-label="Clear all filters"
          onClick={() => onFiltersChange({ search: "", status: "", owner: "" })}
        >
          Clear
        </Button>
      )}

      <Button
        variant="primary"
        size="md"
        aria-label="Create new project"
        onClick={onCreateClick}
      >
        + New Project
      </Button>
    </div>
  );
}
