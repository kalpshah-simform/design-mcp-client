import { Button, Card } from "../../../components/ui";

interface EmptyStateProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onCreateClick: () => void;
}

export default function EmptyState({
  hasActiveFilters,
  onClearFilters,
  onCreateClick,
}: EmptyStateProps) {
  return (
    <Card elevation="none" padding="lg" className="text-center">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-md py-xl">
        <span aria-hidden="true" className="text-2xl">
          📂
        </span>
        <h3 className="text-lg font-semibold text-secondary">
          {hasActiveFilters ? "No projects match your filters" : "No projects yet"}
        </h3>
        <p className="text-gray-600">
          {hasActiveFilters
            ? "Try adjusting your search or clearing the filters."
            : "Get started by creating your first project."}
        </p>
        {hasActiveFilters ? (
          <Button
            variant="secondary"
            aria-label="Clear all filters"
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        ) : (
          <Button
            variant="primary"
            aria-label="Create new project"
            onClick={onCreateClick}
          >
            + New Project
          </Button>
        )}
      </div>
    </Card>
  );
}
