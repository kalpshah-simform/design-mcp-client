import { useEffect, useMemo, useState } from "react";
import type { SortState } from "../../components/ui";
import { fetchProjects, type Project } from "../../data/projects";
import CreateProjectModal from "./components/CreateProjectModal";
import EmptyState from "./components/EmptyState";
import LoadingState from "./components/LoadingState";
import ProjectTable from "./components/ProjectTable";
import ProjectToolbar, {
  type ProjectFiltersState,
} from "./components/ProjectToolbar";

const INITIAL_FILTERS: ProjectFiltersState = { search: "", status: "", owner: "" };

export default function ProjectManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProjectFiltersState>(INITIAL_FILTERS);
  const [sort, setSort] = useState<SortState>({ key: "name", direction: "asc" });
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchProjects().then((data) => {
      if (!cancelled) {
        setProjects(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const owners = useMemo(
    () => [...new Set(projects.map((p) => p.owner))].sort((a, b) => a.localeCompare(b)),
    [projects],
  );

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return projects
      .filter((p) => {
        const matchesSearch =
          query === "" ||
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query);
        const matchesStatus = filters.status === "" || p.status === filters.status;
        const matchesOwner = filters.owner === "" || p.owner === filters.owner;
        return matchesSearch && matchesStatus && matchesOwner;
      })
      .sort((a, b) => {
        const left = String(a[sort.key] ?? "");
        const right = String(b[sort.key] ?? "");
        return sort.direction === "asc"
          ? left.localeCompare(right)
          : right.localeCompare(left);
      });
  }, [projects, filters, sort]);

  const hasActiveFilters =
    filters.search !== "" || filters.status !== "" || filters.owner !== "";

  const handleFiltersChange = (next: ProjectFiltersState) => {
    setFilters(next);
  };

  const handleCreate = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
    setCreateOpen(false);
    setFilters(INITIAL_FILTERS);
    setSort({ key: "name", direction: "asc" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-gray-100 bg-surface shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-lg py-md">
          <h1 className="text-2xl font-bold text-secondary">Project Management</h1>
          <p className="hidden text-sm text-gray-600 sm:block">
            {projects.length} total projects
          </p>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-lg px-lg py-lg">
        <ProjectToolbar
          filters={filters}
          owners={owners}
          onFiltersChange={handleFiltersChange}
          onCreateClick={() => setCreateOpen(true)}
        />

        {loading ? (
          <LoadingState />
        ) : filtered.length === 0 ? (
          <EmptyState
            hasActiveFilters={hasActiveFilters}
            onClearFilters={() => handleFiltersChange(INITIAL_FILTERS)}
            onCreateClick={() => setCreateOpen(true)}
          />
        ) : (
          <ProjectTable
            key={`${filters.search}|${filters.status}|${filters.owner}`}
            projects={filtered}
            sort={sort}
            onSortChange={setSort}
          />
        )}
      </main>

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
