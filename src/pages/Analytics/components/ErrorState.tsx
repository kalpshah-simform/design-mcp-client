import { Button, Card } from "../../../components/ui";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card elevation="none" padding="md" className="border-l-4 border-red-600 bg-red-50">
      <div className="flex items-start gap-md">
        <div className="mt-xs flex-shrink-0 text-xl" aria-hidden="true">
          ⚠️
        </div>
        <div className="flex flex-1 flex-col gap-xs">
          <h2 className="font-semibold text-secondary">
            Failed to load analytics
          </h2>
          <p className="text-sm text-gray-600">{message}</p>
          <div className="mt-xs">
            <Button
              variant="secondary"
              size="sm"
              onClick={onRetry}
              aria-label="Retry loading analytics"
            >
              Try again
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
