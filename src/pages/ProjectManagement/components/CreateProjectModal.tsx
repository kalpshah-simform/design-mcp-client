import { useState, type FormEvent } from "react";
import { Button, Input, Modal } from "../../../components/ui";
import {
  PROJECT_STATUSES,
  type Project,
  type ProjectStatus,
} from "../../../data/projects";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (project: Project) => void;
}

interface FormState {
  name: string;
  description: string;
  owner: string;
  status: ProjectStatus;
  dueDate: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  description: "",
  owner: "",
  status: "Active",
  dueDate: "",
};

const fieldLabelClassName = "mb-xs block text-sm font-medium text-gray-600";
const selectClassName =
  "min-h-touch w-full rounded-md border border-gray-600 bg-surface px-md text-md text-secondary focus:border-primary focus:outline focus:outline-2 focus:outline-primary";

export default function CreateProjectModal({
  open,
  onClose,
  onCreate,
}: Readonly<CreateProjectModalProps>) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [error, setError] = useState("");

  const update = (patch: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setError("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.owner.trim()) {
      setError("Project name and owner are required.");
      return;
    }
    onCreate({
      id: `p-${crypto.randomUUID().slice(0, 8)}`,
      name: form.name.trim(),
      description: form.description.trim(),
      owner: form.owner.trim(),
      status: form.status,
      createdAt: new Date().toISOString().slice(0, 10),
      dueDate: form.dueDate,
    });
    setForm(INITIAL_FORM);
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Create Project" size="md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-md">
        <div>
          <label htmlFor="project-name" className={fieldLabelClassName}>
            Name *
          </label>
          <Input
            id="project-name"
            type="text"
            placeholder="e.g. Apollo CRM Revamp"
            aria-label="Project name"
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="project-description" className={fieldLabelClassName}>
            Description
          </label>
          <Input
            id="project-description"
            type="text"
            placeholder="What is this project about?"
            aria-label="Project description"
            value={form.description}
            onChange={(e) => update({ description: e.target.value })}
          />
        </div>

        <div className="grid gap-md sm:grid-cols-2">
          <div>
            <label htmlFor="project-owner" className={fieldLabelClassName}>
              Owner *
            </label>
            <Input
              id="project-owner"
              type="text"
              placeholder="e.g. Aarav Shah"
              aria-label="Project owner"
              value={form.owner}
              onChange={(e) => update({ owner: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="project-status" className={fieldLabelClassName}>
              Status
            </label>
            <select
              id="project-status"
              aria-label="Project status"
              className={selectClassName}
              value={form.status}
              onChange={(e) =>
                update({ status: e.target.value as ProjectStatus })
              }
            >
              {PROJECT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="project-due-date" className={fieldLabelClassName}>
            Due date
          </label>
          <Input
            id="project-due-date"
            type="date"
            aria-label="Project due date"
            value={form.dueDate}
            onChange={(e) => update({ dueDate: e.target.value })}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-error">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-sm border-t border-gray-100 pt-md">
          <Button
            variant="secondary"
            aria-label="Cancel project creation"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" aria-label="Create project">
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
