import { Button, Card } from "../../../components/ui";
import type { DateRange } from "../../../data/analytics";

interface EmptyStateProps {
  dateRange: DateRange;
}

const RANGE_LABELS: Record<DateRange, string> = {
  "7d": "the last 7 days",
  "30d": "the last 30 days",
  "90d": "the last 90 days",
};

export default function EmptyState({ dateRange }: EmptyStateProps) {
  return (
    <Card elevation="none" padding="lg" className="border border-gray-100">
      <div className="flex flex-col items-center gap-md py-lg text-center">
        <div className="text-4xl" aria-hidden="true">
          📊
        </div>
        <div>
          <h2 className="text-lg font-semibold text-secondary">
            No data for this period
          </h2>
          <p className="mt-xs text-sm text-gray-600">
            There are no events recorded for {RANGE_LABELS[dateRange]}.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          aria-label="Set up tracking"
          onClick={() => {
            console.log("Open tracking setup");
          }}
        >
          Set up tracking
        </Button>
      </div>
    </Card>
  );
}
