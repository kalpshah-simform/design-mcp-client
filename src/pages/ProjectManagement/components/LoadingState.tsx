import { Card } from "../../../components/ui";

const SKELETON_ROWS = 6;

export default function LoadingState() {
  return (
    <Card elevation="none" padding="md" aria-label="Loading projects">
      <output className="block w-full animate-pulse" aria-live="polite">
        <span className="sr-only">Loading projects…</span>
        <div aria-hidden="true">
          <div className="mb-md h-md rounded-sm bg-gray-100" />
          {Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <div key={i} className="mb-sm flex gap-md">
              <div className="h-md flex-1 rounded-sm bg-gray-100" />
              <div className="h-md w-3xl rounded-sm bg-gray-100" />
              <div className="h-md w-3xl rounded-sm bg-gray-100" />
              <div className="h-md w-3xl rounded-sm bg-gray-100" />
            </div>
          ))}
        </div>
      </output>
    </Card>
  );
}
